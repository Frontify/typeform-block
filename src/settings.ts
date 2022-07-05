import { DropdownSize, IconEnum } from "@frontify/fondue";
import { BlockHeight } from "./types";
import { BlockSettings } from "@frontify/guideline-blocks-settings";

export const HEIGHT_DEFAULT_VALUE = BlockHeight.Small;

const settings: BlockSettings = {
  main: [
    {
      id: "embed-style",
      type: "dropdown",
      defaultValue: "standard",
      size: DropdownSize.Large,
      choices: [
        {
          value: "standard",
          icon: IconEnum.FigureTextBottom,
          label: "Standard",
        },
        {
          value: "popupButton",
          icon: IconEnum.Button,
          label: "Popup Button",
        },
        {
          value: "sliderButton",
          icon: IconEnum.Button,
          label: "Slider Button",
        },
      ],
    },
  ],
  content: [
    {
      id: "form-id",
      type: "input",
      label: "Typeform Form ID",
      info: "You can find <form-id> from the public URL of your form: https://form.typeform.com/to/<form-id>",
    },
    {
      id: "buttonText",
      label: "Button Label",
      type: "input",
      placeholder: "Open",
      defaultValue: "Open",
      show: (bundle: any): boolean =>
        ["popupButton", "sliderButton"].includes(
          bundle.getBlock("embed-style")?.value
        ),
    },
  ],
  layout: [
    {
      id: "hideHeader",
      type: "switch",
      label: "Hide header",
      defaultValue: false,
    },
    {
      id: "hideProgressBar",
      type: "switch",
      label: "Hide progress bar",
      defaultValue: false,
    },
    {
      id: "isHeightCustom",
      type: "switch",
      label: "Block Height",
      switchLabel: "Custom",
      defaultValue: false,
      show: (bundle: any): boolean =>
        bundle.getBlock("embed-style")?.value === "standard",
      info: "Determines the block height.",
      on: [
        {
          id: "heightCustom",
          type: "input",
          placeholder: "100px",
          rules: [
            {
              errorMessage: "Please use a numerical value with or without 'px'",
              validate: (value: string) =>
                value.match(/^-?\d+(?:px)?$/g) !== null,
            },
          ],
          onChange: (bundle: any): void => {
            const blockHeight = Number(bundle.getBlock("heightCustom")?.value);

            if (!Number.isNaN(blockHeight)) {
              bundle.setBlockValue("heightCustom", `${blockHeight}px`);
            }
          },
        },
      ],
      off: [
        {
          id: "heightSimple",
          type: "slider",
          defaultValue: HEIGHT_DEFAULT_VALUE,
          choices: [
            {
              value: BlockHeight.Small,
              label: "S",
            },
            {
              value: BlockHeight.Medium,
              label: "M",
            },
            {
              value: BlockHeight.Large,
              label: "L",
            },
          ],
        },
      ],
    },
  ],
  style: [
    {
      id: "opacity",
      label: "Background transparency",
      type: "input",
      placeholder: "0%",
      show: (bundle: any): boolean =>
        bundle.getBlock("embed-style")?.value === "standard",
      rules: [
        {
          errorMessage: "Please use a numerical value with or without '%'",
          validate: (value: string) => value.match(/^-?\d+%?$/g) !== null,
        },
      ],
      onChange: (bundle: any): void => {
        const blockOpacity = Number(bundle.getBlock("opacity")?.value);

        if (!Number.isNaN(blockOpacity)) {
          bundle.setBlockValue("heightCustom", `${blockOpacity}%`);
        }
      },
    },
  ],
};

export default settings;
