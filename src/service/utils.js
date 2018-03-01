// export const goTODetails = (type,id)=> {
//   switch (type){
//     case 1:
//       let url = `http://quan-test.xiaoheiban.cn/#/article?${id}`;
//       JSAction.openUrl(url);
//       break;
//     case 2:
//       let url = `http://quan-test.xiaoheiban.cn/#/audio?${id}`;
//       JSAction.openUrl(url);
//       break;
//     default:
//       let url = `http://quan-test.xiaoheiban.cn/#/video?${id}`;
//       JSAction.openUrl(url);
//   }
// };

export  const changeFormat=(duration)=>{
  if(duration/60>=10){
    if(duration%60>=10){

      return parseInt(duration/60) +':'+ parseInt(duration%60)
    }else{
      return parseInt(duration/60) +':0'+ parseInt(duration%60)
    }
  }else{
    if(duration%60>=10){
      return '0'+ parseInt(duration/60) + ':' + parseInt(duration%60)
    }else{
      return '0'+ parseInt(duration/60) + ':0' + parseInt(duration%60)
    }
  }
}


