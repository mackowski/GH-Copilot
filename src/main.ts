import * as core from '@actions/core'
import * as github from '@actions/github'
import { introOpenAi } from './openai'
import { readFileSync } from 'fs'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const git_diff: string = core.getInput('git_diff')
    const github_token = core.getInput('GITHUB_TOKEN')
    const context = github.context

    const file = readFileSync('./test_diff.txt', 'utf-8')
    core.debug(`Diff in input ${file}`)
    console.log(`Diff in input ${file}`)

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Diff in input ${git_diff}`)

    console.log('Hello! From PR Copilot')
    console.log(`Diff in input ${git_diff}`)

    const ai_response = await introOpenAi(core.getInput('openAiApiKey'))
    console.log(`From AI:\n${ai_response}`)

    // Set outputs for other workflow steps to use
    core.setOutput('result', 'OK')

    if (context.payload.pull_request == null) {
      //core.setFailed('No pull request found.')
      console.log('No pull request found.')
    } else {
      //core.setFailed('PR Flow')
      console.log('PR Folw!')
      const pull_request_number = context.payload.pull_request.number

      const octokit = github.getOctokit(github_token)
      octokit.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: pull_request_number,
        body: 'PR Comment'
      })
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
