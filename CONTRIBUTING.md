# Contributing to FormsLab

Contributing to FormsLab is fairly easy. This document will guide you through the process.

## Local Development

To run project locally:

1. Clone or fork the repo.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root of the project and add at least the following environment variables:

```
DATABASE_URL= # Your MongoDB database URL (you can use a local database or a create on https://www.mongodb.com/cloud/atlas)
NEXTAUTH_JWT_SECRET= # random string
NEXTAUTH_SECRET= # random string
```

4. Run `npm run dev` to start the development server.

## Pull Requests

We actively welcome your pull requests.

1. Fork the repo and create your branch from `develop`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. Make sure your code lints.
5. Create pull request.

## Issues

We use GitHub issues to track public bugs. Please ensure your description is
clear and has sufficient instructions to be able to reproduce the issue.
