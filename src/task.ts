import goTask from "./task/go-task";
import taskWarrior from "./task/taskwarrior";

const completionSpec: Fig.Spec = {
  name: "task",
  // loadSpec doesn't work for root commands (https://github.com/withfig/autocomplete/issues/223)
  generateSpec: async (_tokens, executeShellCommand) => {
    // `task --version` stopped printing the "Task version:" prefix in
    // go-task 3.43.0, so tell the two CLIs apart by their `version`
    // subcommand output: taskwarrior prints a banner that names Taskwarrior.
    const { stdout } = await executeShellCommand({
      command: "task",
      args: "version",
    });
    return stdout.includes("Taskwarrior") ? taskWarrior : goTask;
  },
};

export default completionSpec;
