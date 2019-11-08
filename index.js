const core = require('@actions/core');
const github = require('@actions/github');
const folderContentsChanged = require('check-if-folder-contents-changed-in-git-commit-range');

const current = github.context.sha.slice(0, 7);
const previous = require('child_process')
    .execSync('git rev-parse HEAD^')
    .toString()
    .trim()
    .slice(0, 7);

const checkChanged = x => folderContentsChanged(x, `${previous}...${current}`);
core.exportVariable(core.getInput('var'), checkChanged(core.getInput('path')));
