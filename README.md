# Nx & Angular (Project Crystal)

This repo contains a POC showing how an [Angular Crystal Plugin](https://nx.dev/concepts/inferred-tasks) would help import external repos into an Nx workspace.

> [!IMPORTANT]
> This is only a Proof of Concept. The goal is to help visualize what the experience would be like and help with the discussion of a possible Crystal-like experience for Angular projects. It's not a final design or a [full-featured implementation](#implemented-capabilities--scope).

## POC structure

The POC has the following branches:

- [main](https://github.com/leosvelperez/nx-angular-crystal): contains the initial Angular CLI repo with an application and two of libraries, migrated to Nx and the plugin implementation
- [imported-angular-cli-repo](https://github.com/leosvelperez/nx-angular-crystal/tree/imported-angular-cli-repo): showcases an [imported Angular CLI repo](#imported-angular-cli-repo) into the workspace

## Getting started

The `main` branch contains a regular Nx workspace (migrated from an initial Angular CLI workspace). You can run the normal tasks you would in any Nx workspace:

```shell
pnpm install
pnpm nx build
pnpm nx serve
```

## Imported Angular CLI repo

> [!IMPORTANT]
> The described flow and examples in this section are not a final design or exact representation of what the future `nx import` command will be, but they offer an idea.

To explore the imported Angular CLI repo, check out the `imported-angular-cli-repo` branch and perform a package installation:

```shell
git checkout imported-angular-cli-repo
pnpm install
```

You'll find the imported repo projects in `projects/my-ng-app`. You'll notice that it has all the root files the original Angular CLI repo had. The `angular.json` file is used by the Nx Angular Crystal plugin to infer the tasks to run. The future `nx import` command would offer a similar experience (though the folder structure might be different and will also preserve the Git history of the imported repo).

Once a repo is imported into an existing Nx workspace, you can treat it as a "group" of projects inside your workspace. To ease the migration, you are able to run the same commands you use to run from the root of that "group".

```shell
cd projects/my-ng-app
pnpm ng build my-lib1
pnpm ng build my-lib2
pnpm ng serve
```

That way, your workflow didn't change (other than the root path). The path where the imported repo is located becomes its root path when it comes to running Angular CLI commands.

That said, you could already start using Nx from the root of the workspace to run those same tasks. You can see the project graph to check that the projects are already picked up:

```shell
cd ../..
pnpm nx graph
```

You can also check the inferred tasks for your imported projects:

```shell
pnpm nx show project my-ng-app --web
pnpm nx show project my-lib1 --web
pnpm nx show project my-lib2 --web
```

Run the tasks and start benefiting from the Nx task orchestration and caching:

```shell
pnpm nx run-many -t build --all --parallel
pnpm nx serve my-ng-app
```

## Implemented capabilities & scope

This repo contains a local plugin with a lightweight implementation covering the basic features needed to infer tasks for Angular projects. It doesn't try to support all scenarios or edge cases. Below is a list of what's supported:

- Create inferred targets from `angular.json` file(s)
- Inferred targets have the same name as the `angular.json` targets they are for. They contain the same `configurations` (if any) and will accordingly run:
  - `ng <target> <project>`
  - `ng <target> <project> --configuration=<configuration>`
- Set up targets named `build` to be cacheable
  - If the target has an option `outputPath`, it will be used by the inferred target `outputs` property
  - Otherwise, a default `{workspaceRoot}/<imported repo location>/dist/{projectName}` is used (what Angular CLI generates by default)
- Set up targets named `test` to be cacheable
  - `{workspaceRoot}/<imported repo location>/coverage/{projectName}` is used as the `outputs`
