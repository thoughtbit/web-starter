const enums = {
  rulesMap: [
    {
      value: 'chinese',
      label: '只能输入中文'
    },
    {
      value: 'english',
      label: '只能输入英文'
    },
    {
      value: 'float',
      label: '只能输入数字'
    },
    {
      value: 'enNum',
      label: '只能输入英文和数字'
    },
    {
      value: 'number',
      label: '只能输入整数'
    },
    {
      value: 'cnEnNum',
      label: '只能输入中文、英文和数字'
    },
    {
      value: 'email',
      label: '只能输入邮箱'
    },
    {
      value: 'mobile',
      label: '只能输入手机号'
    },
    {
      value: 'phone',
      label: '只能输入座机号'
    },
    {
      value: 'phoneAll',
      label: '只能输入手机或座机号'
    },
    {
      value: 'identity',
      label: '只能输入身份证号'
    },
    {
      value: 'postal',
      label: '只能输入邮政编码'
    }
  ],
  size: [
    {
      value: 'KB',
      label: 'KB'
    },
    {
      value: 'MB',
      label: 'MB'
    }
  ],
  audioType: [
    {
      value: 'mp3',
      label: 'mp3'
    },
    {
      value: 'wav',
      label: 'wav'
    },
    {
      value: 'ogg',
      label: 'ogg'
    },
    {
      value: 'acc',
      label: 'acc'
    }
  ],
  imageType: [
    {
      value: 'jpg',
      label: 'jpg'
    },
    {
      value: 'jpeg',
      label: 'jpeg'
    },
    {
      value: 'png',
      label: 'png'
    },
    {
      value: 'gif',
      label: 'gif'
    },
    {
      value: 'bmp',
      label: 'bmp'
    },
    {
      value: 'psd',
      label: 'psd'
    }
  ],
  videoType: [
    {
      value: 'mp4',
      label: 'mp4'
    },
    {
      value: 'rmvb',
      label: 'rmvb'
    },
    {
      value: '3gp',
      label: '3gp'
    },
    {
      value: 'mkv',
      label: 'mkv'
    },
    {
      value: 'wmv',
      label: 'wmv'
    },
    {
      value: 'flv',
      label: 'flv'
    },
    {
      value: 'm4v',
      label: 'm4v'
    },
    {
      value: 'mov',
      label: 'mov'
    }
  ],
  fileType: [
    {
      value: 'doc',
      label: 'doc'
    },
    {
      value: 'docx',
      label: 'docx'
    },
    {
      value: 'xls',
      label: 'xls'
    },
    {
      value: 'xlsx',
      label: 'xlsx'
    },
    {
      value: 'txt',
      label: 'txt'
    },
    {
      value: 'wps',
      label: 'wps'
    },
    {
      value: 'ppt',
      label: 'ppt'
    },
    {
      value: 'pptx',
      label: 'pptx'
    },
    {
      value: 'pdf',
      label: 'pdf'
    }
  ],
  date: [
    {
      value: 'yyyy',
      label: '仅年'
    },
    {
      value: 'MM',
      label: '仅月'
    },
    {
      value: 'dd',
      label: '仅日'
    },
    {
      value: 'yyyy-MM',
      label: '年-月'
    },
    {
      value: 'MM-dd',
      label: '月-日'
    },
    {
      value: 'yyyy-MM-dd',
      label: '年-月-日'
    }
  ],
  datetime: [
    {
      value: 'dd',
      label: '仅日'
    },
    {
      value: 'MM-dd',
      label: '月-日'
    },
    {
      value: 'yyyy-MM-dd',
      label: '年-月-日'
    }
  ],
  timeType: [
    {
      value: 'date',
      label: '日期'
    },
    {
      value: 'time',
      label: '时间'
    },
    {
      value: 'datetime',
      label: '日期+时间'
    }
  ],
  accuracy: [
    {
      value: 'HH',
      label: '时'
    },
    {
      value: 'HH:mm',
      label: '分'
    },
    {
      value: 'HH:mm:ss',
      label: '秒'
    }
  ],
  method: [
    {
      label: 'GET',
      value: 1
    },
    {
      label: 'POST',
      value: 2
    },
    {
      label: 'DELETE',
      value: 3
    },
    {
      label: 'UPDATE',
      value: 4
    },
    {
      label: 'PUT',
      value: 5
    }
  ]
};

export default enums;
