# Website Project Workflow

The website uses GitHub Issues for work and a GitHub Project for the board.

The goal is to make work visible without adding unnecessary process.

## Board

Use these statuses.

### Backlog

Ideas and work that are not ready to start.

### Ready

The task is clear enough for someone to pick up.

### In Progress

Someone is actively working on the task.

### Review

A pull request is open or the work is waiting for review.

### Blocked

The task cannot continue because it needs access, content, a decision or another dependency.

### Done

The change is complete.

## Tickets

Create an issue when work takes more than a quick typo fix.

A useful issue explains the problem, the expected result and anything needed to verify the work.

Keep one issue focused on one outcome.

If a ticket becomes too large, create smaller issues that can be completed and reviewed independently.

## Common ticket types

Bug

Feature

Content

Design

Maintenance

Documentation

## Starting work

1. Pick a ticket in Ready.
2. Assign it to yourself.
3. Move it to In Progress.
4. Create a branch from the latest main branch.
5. Keep the branch focused on that ticket.

## Review

Open a pull request when the change is ready.

GitHub Actions checks the code automatically.

A reviewer should be able to understand the change without reading the entire repository.

For visual work, include screenshots.

Move the ticket to Review while the pull request is open.

## Finishing work

Merge after the checks pass and the change is approved.

The production site deploys automatically from main.

Move the issue to Done after the change is live and verified.

## Larger work

Use one parent issue to explain the overall goal.

Create smaller issues when separate people can work on separate parts.

Do not create extra subtasks for work that can reasonably be completed in one pull request.

## Main branch settings

The main branch should require pull requests for normal changes.

The CI check should pass before merging.

Force pushes and branch deletion should be disabled.

Repository administrators can still handle urgent recovery work when needed.
