import {
  joinPathFragments,
  readJsonFile,
  type CreateNodes,
  type CreateNodesContext,
  type ProjectConfiguration,
  type TargetConfiguration,
} from '@nx/devkit';
import { dirname, join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AngularPluginOptions {}

export const createNodes: CreateNodes<AngularPluginOptions> = [
  '**/angular.json',
  async (configFilePath, _options = {}, context) => {
    const workspaceRoot = dirname(configFilePath);

    const projects = await buildAngularProjects(
      configFilePath,
      workspaceRoot,
      context
    );

    return { projects };
  },
];

type AngularJson = {
  projects: {
    [projectName: string]: {
      root: string;
      architect: {
        [target: string]: {
          builder: string;
          options?: Record<string, any>;
          configurations?: Record<string, any>;
          defaultConfiguration?: string;
        };
      };
    };
  };
};

async function buildAngularProjects(
  configFilePath: string,
  angularWorkspaceRoot: string,
  context: CreateNodesContext
): Promise<Record<string, ProjectConfiguration>> {
  const projects: Record<string, ProjectConfiguration> = {};

  const absoluteConfigFilePath = join(context.workspaceRoot, configFilePath);
  const angularJson = readJsonFile<AngularJson>(absoluteConfigFilePath);

  for (const [projectName, project] of Object.entries(angularJson.projects)) {
    const targets: Record<string, TargetConfiguration> = {};

    for (const [targetName, angularTarget] of Object.entries(
      project.architect
    )) {
      targets[targetName] = {
        command: `ng ${targetName} ${projectName}`,
        options: { cwd: angularWorkspaceRoot },
      };

      if (angularTarget.configurations) {
        for (const configurationName of Object.keys(
          angularTarget.configurations
        )) {
          targets[targetName].configurations = {
            ...targets[targetName].configurations,
            [configurationName]: {
              command: `ng ${targetName} ${projectName} --configuration=${configurationName}`,
            },
          };
        }
      }

      if (angularTarget.defaultConfiguration) {
        targets[targetName].defaultConfiguration =
          angularTarget.defaultConfiguration;
      }

      if (targetName === 'build') {
        targets[targetName].cache = true;
        targets[targetName].dependsOn = ['^build'];
        targets[targetName].inputs = ['production', '^production'];
        targets[targetName].outputs = [
          angularTarget.options?.['outputPath']
            ? joinPathFragments(
                '{workspaceRoot}',
                angularWorkspaceRoot,
                angularTarget.options['outputPath']
              )
            : joinPathFragments(
                '{workspaceRoot}',
                angularWorkspaceRoot,
                'dist/{projectName}'
              ),
        ];
      }

      if (targetName === 'test') {
        targets[targetName].cache = true;
        targets[targetName].inputs = ['default', '^production'];
        targets[targetName].outputs = [
          '{workspaceRoot}/coverage/{projectName}',
        ];
      }
    }

    projects[projectName] = {
      name: projectName,
      root: joinPathFragments(angularWorkspaceRoot, project.root),
      targets,
    };
  }

  return projects;
}
