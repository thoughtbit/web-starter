import { PropType } from "vue";

export default {
  // type:null
  any() {
    return {
      type: null,
    };
  },
  // type:String
  string(d?: string) {
    return {
      type: String,
      default: d,
    };
  },
  // type:Number
  number(d?: number) {
    return {
      type: Number,
      default: d,
    };
  },
  // type:Boolean
  bool(d = false) {
    return {
      type: Boolean,
      default: d,
    };
  },
  // type:Object
  object(d = {}) {
    return {
      type: Object,
      default: function () {
        return d;
      },
    };
  },
  // type:Array
  array<T>(d?: Array<any>) {
    return {
      type: Array as PropType<T[]>,
      default: function () {
        return d;
      },
    };
  },
  // type:Function
  func(d?: any) {
    if (d !== undefined) {
      return {
        type: Function,
        default: function () {
          return d;
        },
      };
    } else {
      return {
        type: Function,
      };
    }
  },

  oneOfType(list: Array<any>, d?: any) {
    const types = list.map((prop) => {
      return prop["type"];
    });
    return {
      type: types,
      default: d,
    };
  },
  // type:
  oneOfString(list: Array<any>, d?: any) {
    return {
      validator: function (value: string) {
        return list.indexOf(value) !== -1;
      },
      default: d,
    };
  },
  date(d?: Date) {
    return {
      type: Date,
      default: d,
    };
  },
};
