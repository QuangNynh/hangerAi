export interface Tool {
  title: string;
  subTitle?: string;
  link: string;
  img: string;
  isFav?: boolean;
}

export const toolList: Record<string, Tool> = {
  imageInpainting: {
    title: `Image Inpainting`,
    subTitle: ``,
    img: `/src/assets/toolImageIcon/imageInpainting.png`,
    link: ``,
  },
  imageSuperResolution: {
    title: `Image Super Resolution`,
    subTitle: ``,
    img: `/src/assets/toolImageIcon/Image Super Resolution.png`,
    link: ``,
  },
  productBackgroundGenerator: {
    title: `Product Background Generator`,
    subTitle: ``,
    img: `/src/assets/toolImageIcon/Product Background Generator.png`,
    link: ``,
  },
  productContentWriting: {
    title: `Product Content Writing`,
    subTitle: `/src/assets/toolImageIcon/imageInpainting.png`,
    img: `/src/assets/toolImageIcon/Product Content Writing .png`,
    link: ``,
  },
  productImageChat: {
    title: `Product Image Chat`,
    subTitle: ``,
    img: `/src/assets/toolImageIcon/Product Image Chat.png`,
    link: ``,
  },
  productTagAndDesciption: {
    title: `Product Tag and Desciption`,
    subTitle: ``,
    img: `/src/assets/toolImageIcon/Product Tag and Desciption  .png`,
    link: ``,
  },
  virtualDressingRoom: {
    title: `Virtual Dressing Room`,
    subTitle: ``,
    img: `/src/assets/toolImageIcon/Virtual Dressing Room.png`,
    link: `/tool/virtual-dressing-room`,
  },
  virtualModel: {
    title: `Virtual Model`,
    subTitle: ``,
    img: `/src/assets/toolImageIcon/Virtual Model .png`,
    link: `/tool/virtual-model`,
  },
  virtualModelChanging: {
    title: `Virtual Model Changing`,
    subTitle: ``,
    img: `/src/assets/toolImageIcon/Virtual Model Changing.png`,
    link: ``,
  },
};
