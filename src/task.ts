import goTask from "./task/go-task";
import taskWarrior from "./task/taskwarrior";

const completionSpec: Fig.Spec = {
  name: "task",
  // loadSpec doesn't work for root commands (https://github.com/withfig/autocomplete/issues/223)
  generateSpec: async (_tokens, executeShellCommand) => {
    const { stdout } = await executeShellCommand({
      command: "task",
      // eslint-disable-next-line @withfig/fig-linter/no-useless-arrays
      args: ["--version"],
    });
    // go-task prints "Task version: vX.Y.Z"; taskwarrior prints a bare version
    if (/task version/i.test(stdout)) {
      return goTask;
    }
    // When the version probe is inconclusive (e.g. it failed or produced no
    // output), fall back to the help output: only go-task documents a
    // --taskfile flag
    const { stdout: helpOut } = await executeShellCommand({
      command: "task",
      // eslint-disable-next-line @withfig/fig-linter/no-useless-arrays
      args: ["--help"],
    });
    return /--taskfile|task version/i.test(helpOut) ? goTask : taskWarrior;
  },
};

export default completionSpec;
