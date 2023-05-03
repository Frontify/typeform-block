<a href="https://www.frontify.com/en/">
    <img src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcL1dYUlpzUlhKMTh5M2NhVG42Vk1HLnBuZyJ9:weare:kigx1I2_csIs-6Lm3re6-6BsicXUzKQUHUeouirN_Q0" alt="Frontify logo" title="Frontify" align="right" height="60" />
</a>

# Typeform block

The Typeform block allows you to effortlessly add any Typeform form directly to your Guidelines, without the need for a tedious embed code. All you have to do is supply the form id, and you’re ready to go.

![A screenshot of the Typeform block empty state](https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcL2M4TjlIb0hzRVVLOTZuSzF1a3hNLnBuZyJ9:weare:OyyCOtTzB_-x2ouhvhTgcBCWzva7WtSpToACo_R12Ps)

![](https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcL3FTVVhMOWJoc3lNNXpvVVRUalBILnBuZyJ9:weare:ctndI4roGZDUIFZwpFsPuzdVb0WN4-vKTtTw3MYIU0o)

## Who this project is for

This repository contains the source-code for the Typeform block. It's meant as an example for how to build custom content blocks with the [Frontify Brand SDK](https://www.frontify.com/en/blog/brand-sdk-for-developers-by-developers/). This is an extended version of the block you're building if you follow the [tutorial](https://developer.frontify.com/d/XFPCrGNrXQQM/content-blocks#/use-cases-1/building-a-typeform-block-1) in the [Brand SDK documentation](https://developer.frontify.com/d/XFPCrGNrXQQM/content-blocks). The actual source-code for the block you're building in the tutorial can be found [here](https://github.com/Frontify/typeform-block-tutorial).


## Project dependencies

Before you can build the Typeform block, ensure you have:

* Node.js version 16 (or newer) installed
* made yourself familiar with the [Frontify CLI](https://developer.frontify.com/d/XFPCrGNrXQQM/content-blocks#/details-concepts-1/frontify-cli)
* the [React Developer Tools](https://react.dev/learn/react-developer-tools) installed
* a [Frontify account](https://www.frontify.com/en/signup/?plan=STARTER&interval=YEARLY) to preview the block

You can find a comprehensive guide on all the prerequisites [here](https://developer.frontify.com/d/XFPCrGNrXQQM/content-blocks#/getting-started-1/prerequisites).

## Instructions for using the Typeform block

Get started with the Typeform block by cloning the repository, installing its dependencies, and running the `serve` task.

1. Clone the repository

    `git clone git@github.com:Frontify/typeform-block.git`

2. Install the project dependencies

    `npm ci`

3. Run the `serve` task

    `npm run serve`

4. In your Frontify Guidelines switch to the edit mode (pencil icon in the sidebar)

5. Click on the plus icon and add a "Local Block Development" block

    ![A screenshot of the content block list](https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcL3BqekRMa3JTWFdOenFhaEZMTkIzLnBuZyJ9:weare:EM0x9it_g2t_1RJ2NyZNOxohAFj_aax5FOXNMGgIADk)

    > **Note**
    > If you can't find the "Local Block Development" block, you probably don't have access to the Brand SDK and Marketplace yet. Please reach out to use on [Slack](https://join.slack.com/t/frontify-friends/shared_invite/zt-1lhu6lump-s18oTGI4EhHt8BKWfBAN_A) so we can activate it for you.

7. Choose port (default is 5600) and click OK

    ![A screenshot of the port selection](https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzZ3Q241RlJVTjkyZTZKOHlBZVRpLnBuZyJ9:weare:pUETT-owG_y2pmOKqNRozHi1dsMeFf3msAGHORbiEF0)

The Guidelines should now show the Typeform block. If you don't see it, try refreshing the page.


## Additional documentation

For more information check out the [Frontify Brand SDK documentation](https://developer.frontify.com/d/XFPCrGNrXQQM/content-blocks).
