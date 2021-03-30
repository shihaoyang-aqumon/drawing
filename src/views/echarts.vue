<template>
  <div class="bar-wrap">
    <div class="bar" ref="bar"></div>
    <dom-list :domList="domList" :part="part" :height="domListHeight" :top="-100" :showTitle="true"></dom-list>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import domList from "./domList";
export default {
  components: {
    domList
  },
  data() {
    return {
      factList: {
        en: [
          {
            category: 3,
            display: null,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#ee2f79"
                },
                {
                  offset: 1,
                  color: "#f46a6a"
                }
              ]),
              barBorderRadius: [15, 15, 0, 0],
              opacity: 1
            },
            name: "Momentum",
            text:
              "In the medium term, equity funds that have performed well in the past are likely to outperform in the future.",
            value: "96.61"
          },
          {
            category: 1,
            display: "Medium",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#ee2f79"
                },
                {
                  offset: 1,
                  color: "#f46a6a"
                }
              ]),
              barBorderRadius: [15, 15, 0, 0],
              opacity: 1
            },
            name: "Long-term Reversal",
            text:
              "Stocks that have performed well in the long-term past are likely to underperform in the future. Funds that invest in this type of stock will have the same feature.",
            value: "54.75"
          }
        ],
        cn: [
          {
            category: 3,
            display: null,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#ee2f79"
                },
                {
                  offset: 1,
                  color: "#f46a6a"
                }
              ]),
              barBorderRadius: [15, 15, 0, 0],
              opacity: 1
            },
            name: "动量",
            text:
              "股票型基金在中期会呈现动量现象——过去的表现越好，未来的表现也就越好。",
            value: "96.61"
          },
          {
            category: 1,
            display: "中",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#ee2f79"
                },
                {
                  offset: 1,
                  color: "#f46a6a"
                }
              ]),
              barBorderRadius: [15, 15, 0, 0],
              opacity: 1
            },
            name: "长期反转风格暴露度",
            text:
              "股票型基金在中期会呈现动量现象——过去的表现越好，未来的表现也就越好。",
            value: "54.75"
          }
        ]
      },
      contentHeight: 160,
      yLabelList: {
        en: ["0", "Bottom 25%", "Top 50%", "Top 25%"],
        cn: ["0", "后25%", "前50%", "前25%"]
      },
      splitColor: ["#c5c5c5", "#c5c5c5", "#c5c5c5", "#c5c5c5", "#fff"],
      option: {},
      factorName: "",
      domList: {},
      wordAmountArr: [],
      wordMaxAmount: 0,
      domListHeight: 0,
      barTop: 20,
      language: "en",
      part: 0
    };
  },
  methods: {
    init() {
      this.language = localStorage.getItem("language");
      this.part = (1180 - 118) / this.factList[this.language].length;
      this.drawEchart();
      console.log(this.factList[this.language]);
      this.domList = this.factList[this.language].reduce((pre, cur) => {
        pre[cur.category] = pre[cur.category] || [];
        pre[cur.category].push(cur);
        return pre;
      }, {});
    },
    drawEchart() {
      let _this = this;
      this.option = {
        grid: {
          top: _this.barTop,
          left: "10%",
          right: "0",
          bottom: 0,
          height: _this.contentHeight,
          containLabel: false // grid 区域是否包含坐标轴的刻度标签
        },
        tooltip: {
          show: true,
          trigger: "axis",
          confine: true,
          backgroundColor: "#fff",
          textStyle: {
            color: "#333"
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);", // 设置tooltip浮窗的阴影
          formatter(val) {
            if (val[0].name !== _this.factorName) {
              _this.factorName = val[0].name;
            }
            return `<div style="width:400px;white-space:normal;padding:10px;text-align:left">
            <p style="font-weight:bold;">${val[0].data.name}</p>
            <p>${val[0].data.text}</p>
            </div>`;
          }
        },
        xAxis: [
          {
            type: "category",
            data: this.factList[this.language].map(item => {
              return item.name;
            }),
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#333",
                fontSize: 16,
                lineHeight: 18
              },
              formatter: function(params) {
                if (localStorage.getItem("language") === "en") {
                  // 得到英文单词的个数，知道有多少行
                  _this.wordAmountArr.push(params.split(" ").length);
                  return params.replace(/\s/g, "\n");
                } else {
                  var newParamsName = ""; // 最终拼接成的字符串
                  var paramsNameNumber = params.length; // 实际标签的个数
                  var provideNumber = 4; // 每行能显示的字的个数
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                  _this.wordAmountArr.push(rowNumber);
                  /**
                   * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                   */
                  // 条件等同于rowNumber>1
                  if (paramsNameNumber > provideNumber) {
                    /** 循环每一行,p表示行 */
                    for (var p = 0; p < rowNumber; p++) {
                      var tempStr = ""; // 表示每一次截取的字符串
                      var start = p * provideNumber; // 开始截取的位置
                      var end = start + provideNumber; // 结束截取的位置
                      // 此处特殊处理最后一行的索引值
                      if (p == rowNumber - 1) {
                        // 最后一次不换行
                        tempStr = params.substring(start, paramsNameNumber);
                      } else {
                        // 每一次拼接字符串并换行
                        tempStr = params.substring(start, end) + "\n";
                      }
                      newParamsName += tempStr; // 最终拼成的字符串
                    }
                  } else {
                    // 将旧标签的值赋给新标签
                    newParamsName = params;
                  }
                  //将最终的字符串返回
                  return newParamsName;
                }
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            interval: 25,
            boundaryGap: true,
            min: 0,
            max: 100,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 70,
              align: "left",
              fontSize: 14,
              color: "#999",
              padding: 0,
              formatter(val, index) {
                const yLabel = _this.yLabelList[_this.language][index];
                if (localStorage.getItem("language") === "en" && yLabel) {
                  return yLabel.replace(/\s/g, "\n");
                }
                return yLabel;
              }
            },
            splitLine: {
              lineStyle: {
                // 展示y轴的分割线
                // 因为最后一根不需要显示，所以将最后一根设置与背景色相同，达到隐藏的效果
                color: _this.splitColor
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: 30,
            data: this.factList[this.language],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 14
                  },
                  formatter(params) {
                    const result = params.data.display;
                    return result ? result : ""; // 如果值为null或者undefined，则会展示画图所用的值，所以需要给个'';
                  }
                }
              }
            }
          }
        ]
      };
      const myChart = echarts.init(this.$refs.bar);
      myChart.setOption(this.option);
      // 得到最大的行数，如果小于等于2行，则默认留2行距离，因为x轴的label会有间隙，所以只有一行时就用2行高度
      _this.wordMaxAmount = Math.max.apply(null, _this.wordAmountArr);
      _this.wordMaxAmount = _this.wordMaxAmount <= 2 ? 2 : _this.wordMaxAmount;
      const echartsHeight =
        _this.contentHeight + _this.barTop + _this.wordMaxAmount * 25;
      myChart.resize({
        height: echartsHeight
      });
      _this.domListHeight = echartsHeight + 100;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
.bar-wrap {
  position: relative;
  margin-top: 100px;
  .bar {
    width: 1180px;
    // height: 400px;
  }
}
</style>
