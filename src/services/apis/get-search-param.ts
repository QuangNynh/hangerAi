import kyInstance from '../ky';

export interface SearchParamObj {
  title: string;
  link: string;
  img?: string;
  isLock?: boolean;
}
export interface GetSearchParam {
  assets: SearchParamObj[];
  tools: SearchParamObj[];
}
export const defaultGetSearchParam: GetSearchParam = {
  assets: [
    {
      title: 'assets',
      link: '#',
      img: 'https://placehold.co/600x400/000000/FFF?text=Asset%201',
      // isLock: true
    },
  ],
  tools: [
    {
      title: 'tool',
      link: '#',
      img: 'https://placehold.co/600x400/000000/FFF?text=Tool%201',
      // isLock: true
    },
  ],
};
export default async function getSearchParam(
  searchText = '',
  isTest?: boolean
): Promise<GetSearchParam> {
  if (isTest) {
    console.log('KO');
  }
  //   kyInstance.get('', { searchParams: searchText ? { searchText } : {} });
  return defaultGetSearchParam;
}
