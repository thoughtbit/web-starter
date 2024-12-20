import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import more from './../../assets/icons/more.png'

import './index.styl'

class Feed extends Component {
  navigateTo = (url) => {
    Taro.navigateTo({url:url});
  }
  render() {
    return (
      <View className='feed-item'>
        <View className='feed-source at-col'>
          <View className='avatar flex1'>
            <Image className='avatar-img' src={this.props.feed_source_img}></Image>
          </View>
          <View className='flex8'>
            <Text className='feed-source-txt'>{this.props.feed_source_name}{this.props.feed_source_txt}</Text>
          </View>
          <View className='flex1'>
            <Image className='item-more' mode='aspectFit' src={more}></Image>
          </View>
        </View>
        <View className='feed-content'>
            <View className='question' onClick={this.navigateTo.bind(this,'/pages/auth/auth')}>
              <View className='question-link'>
                <Text>{this.props.question}</Text>
              </View>
            </View>
            <View className='answer-body'>
              <View>
                <Text className='answer-txt'>{this.props.answer_ctnt}</Text>
              </View>
              <View className='answer-actions'>
                <View className='like dot'>
                  <View>{this.props.good_num} 赞同 </View>
                </View>
                  <View className='comments dot'>
                    <View>{this.props.comment_num} 评论 </View>
                  </View>
                <View className='follow-it'>
                  <View>关注问题</View>
                </View>
              </View>
            </View>
        </View>
      </View>
    );
  }
}


export default Feed;
