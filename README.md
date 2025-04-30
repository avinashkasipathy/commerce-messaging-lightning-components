# @salesforce/commerce-messaging-components

![agent-logo](agent-logo.png)
🌟 Welcome to the Commerce Messaging Lightning Web Components Starter Kit! 🛍️

We're excited to take you on an ongoing development journey designed to deliver robust building blocks for crafting agentic commerce experiences within MIAW. Whether you're a customer or partner looking to create a compelling, user-friendly commerce experience, you're in the right place.

While the project is still under active development, we’re committed to gradually releasing the essential components you need. Each release will bring you closer to building a seamless, efficient agentic experience. With our carefully crafted reference components, you'll be empowered to assemble dynamic product recommendations, smooth shopping carts, intuitive checkout flows, and much more. This lets you focus on what truly matters – creating an agentic experience that not only meets but exceeds your users’ expectations.

Join us on this exciting journey as we shape the future of commerce messaging components together. Happy coding and happy commerce building! ✨🚀

---

## The Hopefully Obvious

As you might expect, this project is organized as an SFDX (Salesforce DX) project. And because this is a project that consists almost exclusively of Lightning Web Components (LWC) intended for use with MIAW Widget, everything essential is thus located in the [`force-app/main/default/lwc`](force-app/main/default/lwc) directory.

---

## Installation

<details>
<summary>Installing the components using a Scratch Org</summary>

1.  Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

    -   Enable Dev Hub in your Org
    -   Install Salesforce CLI
    -   Install Visual Studio Code
    -   Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

2.  If you haven't already done so, authorize your hub org and provide it with an alias (**myhuborg** in the command below):

    ```shell
    sf org login web -d -a myhuborg
    ```

3.  Clone the repositoty `akasipathy/commerce-messaging-lightning-components`:

    ```shell
    git clone https://github.com/akasipathy/commerce-messaging-lightning-components.git
    cd commerce-messaging-lightning-components
    ```

4.  Create a scratch org and provide it with an alias (**commerce-messaging-components** in the command below):

    ```shell
    sf org create scratch -f config/project-scratch-def.json -a commerce-messaging-components
    ```

5.  Push the app to your scratch org:

    ```shell
    sf project deploy start
    ```

6.  Open the scratch org:

    ```shell
    sf org open
    ```

    </details>

<details>
<summary>Optional Installation Instructions</summary>

This repository contains several files that are relevant if you want to integrate modern web development tooling to your Salesforce development processes, or to your continuous integration/continuous deployment processes.

### Code Formatting

[Prettier](https://prettier.io/) is a code formatter used to ensure consistent formatting across your code base. To use Prettier with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) from the Visual Studio Code Marketplace. The [.prettierignore](.prettierignore) and [.prettierrc](.prettierrc) files are provided as part of this repository to control the behavior of the Prettier formatter.

### Code Linting

[ESLint](https://eslint.org/) is a popular JavaScript linting tool used to identify stylistic errors and erroneous constructs. To use ESLint with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode-lwc) from the Visual Studio Code Marketplace. The [.eslintrc.cjs](force-app/main/default/lwc/.eslintrc.cjs) file is provided as part of this repository to control the behavior of the linting process in the context of Lightning Web Components development.

### Pre-Commit Hook

This repository also comes with a [package.json](package.json) file that makes it easy to set up a pre-commit hook that enforces code formatting and linting by running Prettier and ESLint every time you `git commit` changes.

To set up the formatting and linting pre-commit hook:

1. Install [Node.js](https://nodejs.org) if you haven't already done so
2. Run `npm install` in your project's root folder to install the ESLint and Prettier modules (Note: Mac users should verify that Xcode command line tools are installed before running this command.)

Prettier and ESLint will now run automatically every time you commit changes. The commit will fail if linting errors are detected. You can also run the formatting and linting from the command line using the following commands (check out [package.json](package.json) for the full list):

```shell
npm run lint
npm run format
```

</details>

---

## Components

### Worth Knowing

The components you will find here are purely presentational components for various aspects of a MIAW agentic experience.

### Overview

<!-- prettier-ignore -->
| Name/FQN                                                                                           | Description                                                        | Application Area     |
|:---------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------|:-----------------|
| [`c/commonButton`](force-app/main/default/lwc/commonButton)                                       | Custom `button` control.                                           | *                |
| [`c/commonLink`](force-app/main/default/lwc/commonLink)                                           | Custom `a[href]` control with `button` styling.                    | *                |
| [`c/commonModal`](force-app/main/default/lwc/commonModal)                                         | Custom `lightning/modal` that exposes two actions.                 | *                |
| [`c/commonNumberInput`](force-app/main/default/lwc/commonNumberInput)                             | Custom `input[type=number]` control.                               | *                |
| [`c/productPricing`](force-app/main/default/lwc/productPricing)                       | Displays pricing information for products.                         | *                |
| [`c/productSearchRecommendations`](force-app/main/default/lwc/productSearchRecommendations)                       | Displays the product and category recommendations based off the search results                         | Search                |
| [`c/dynamicContentRenderer`](force-app/main/default/lwc/dynamicContentRenderer)<br/>`├──`[`c/productSearchRecommendations`](force-app/main/default/lwc/productSearchRecommendations)<br/> | Content renderer component designed to support a variety of rich experiences, depending on the contentType. When no contentType is provided, it defaults to rendering rich text.                         | MIAW Text Messaging Bubble                     |

---

## Resources

-   [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
-   [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
-   [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
-   [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
