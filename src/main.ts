import * as core from '@actions/core'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const git_diff: string = core.getInput('git_diff')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Diff in input ${git_diff}`)

    console.log('Hello! From PR Copilot')
    console.log(`Diff in input ${git_diff}`)

    // Set outputs for other workflow steps to use
    core.setOutput('result', 'OK')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
