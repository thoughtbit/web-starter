import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { Feed } from '../../components/feed'

export default class MessagePage extends Component {
  config = {
    navigationBarTitleText: '消息'
  }

  constructor() {
    super(...arguments)
    this.state = {
      isLoading: true,
      list: []
    };
  }

  componentDidMount() {
    this.getFeedList();
  }

  getFeedList = () => {
    Taro.showLoading({ title: '加载中' });
    Taro.request({
      url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'
    }).then((res) => {
      Taro.hideLoading();
      if(res.data.success) {
        this.setState({
          isLoading: false,
          list: res.data.data
        });
      }
    });
  }

  updateFeedList = () => {
    if(this.state.isLoading) {
      return false;
    }
    this.setState({
      isLoading: true
    });
    Taro.showLoading({ title: '加载中' });
    Taro.request({
      url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'
    }).then((res) => {
      Taro.hideLoading();
      if(res.data.success) {
        this.setState({
          isLoading: false,
          list: res.data.data
        });
      }
    });
  }

  nextPageFeedList = () => {
    if (this.state.isLoading) {
      return false;
    }
    this.setState({
      isLoading: true
    });
    Taro.showLoading({title: '加载中'})
    Taro.request({
      url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'
    }).then(res => {
      Taro.hideLoading()
      if (res.data.success) {
        this.setState({
          list: this.state.list.concat(res.data.data),
          isLoading: false
        })
      }
    })
  }

  componentDidShow() {
    console.log('message show')
  }

  componentDidHide() {
    console.log('message hide')
  }

  componentWillUnmount() {
    console.log('message unmount')
  }

  render() {
    return(
      <ScrollView
        className='container'
        scrollY
        scrollWithAnimation
        scrollTop='0'
        lowerThreshold='10'
        upperThreshold='10'
        onScrolltoupper={this.updateFeedList}
        onScrolltolower={this.nextPageFeedList}
      >
        {
          this.state.loading
          ? <View className='txcenter'>加载中</View>
          : this.state.list.map(item => {
            return <Feed
              key={item}
              feed_source_img={item.feed_source_img}
              feed_source_name={item.feed_source_name}
              feed_source_txt={item.feed_source_txt}
              question={item.question}
              answer_ctnt={item.answer_ctnt}
              good_num={item.good_num}
              comment_num={item.comment_num}
            />
          })
        }
      </ScrollView>
    );
  }
}
