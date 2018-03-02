export const goTODetails = (type,id)=> {
  let url='';
  switch (type){
    case 1:
      url = `http://quan-test.xiaoheiban.cn/#/article?${id}`;
      JSAction.openUrl(url);
      break;
    case 2:
      url = `http://quan-test.xiaoheiban.cn/#/audio?${id}`;
      JSAction.openUrl(url);
      break;
    default:
      url = `http://quan-test.xiaoheiban.cn/#/video?${id}`;
      JSAction.openUrl(url);
  }
};
