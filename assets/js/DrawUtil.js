// hover 框文本样式
var Text

var DrawUtil = {
    // 初始化悬浮文本
    initHoverText(zr){
        Text = new zrender.Text({
            style: {
                fontSize: 14,
                textBackgroundColor: '#FFF',
                textBorderColor: '#000',
                textBorderWidth: 1,
                textBorderRadius: 2,
                textPadding: 5,
            },
            zlevel: 100
        })
        zr.add(Text)
        Text.hide()
    },
    // 绘制纵向文本
    drawText (str, dx, dy) {
        let group = new zrender.Group()

        for (var i = 0; i < str.length; i++) {
            var text = new zrender.Text({
                style: {
                    text: str.charAt(i),
                    fontSize: 14,
                    textFill: '#FF4949',
                    textBackgroundColor: '#FFF',
                }
            })
            let y = 14 * i
            text.attr('position', [0, y])
            group.add(text)
        }

        group.attr('position', [dx, dy])
        return group
    },
    // 绘制实心圆
    drawCircle (Obj, Color) {
        return new zrender.Circle({
            shape: {
                cx: Obj.x,
                cy: Obj.y,
                r: 4
            },
            style: {
                fill: Color
            }
        }).on('mouseover', function () {
            Text.show()

            Text.attr('position', [Obj.x, Obj.y])
            Text.attr({
                style: {
                    text: Obj.txt
                }
            })
        }).on('mouseout', function () {
            Text.hide()
        })
    },
    // 绘制三角形
    drawIsogon (Obj, Color) {
        return new zrender.Isogon({
            shape: {
                x: Obj.x,
                y: Obj.y,
                r: 6,
                n: 3
            },
            style: {
                fill: Color
            }
        }).on('mouseover', function () {
            Text.show()

            Text.attr('position', [Obj.x, Obj.y])
            Text.attr({
                style: {
                    text: Obj.txt
                }
            })
        }).on('mouseout', function () {
            Text.hide()
        })
    },
    // 绘制空心圆
    drawHollowCircle (Obj, Color) {
        return new zrender.Circle({
            shape: {
                cx: Obj.x,
                cy: Obj.y,
                r: 4
            },
            style: {
                fill: '#FFFFFF',
                stroke: Color
            }
        }).on('mouseover', function () {
            Text.show()

            Text.attr('position', [Obj.x, Obj.y])
            Text.attr({
                style: {
                    text: Obj.txt
                }
            })
        }).on('mouseout', function () {
            Text.hide()
        })
    },
    // 绘制×
    drawX (Obj, Color) {
        return new zrender.Text({
            style: {
                text: '×',
                fontSize: 20,
                textFill: Color,
            },
            position: [Obj.x - 7, Obj.y - 11]
        }).on('mouseover', function () {
            Text.show()

            Text.attr('position', [Obj.x, Obj.y])
            Text.attr({
                style: {
                    text: Obj.txt
                }
            })
        }).on('mouseout', function () {
            Text.hide()
        })
    },
    // 绘制圆圈中有点的圆
    drawPointCircle (Obj, Color) {
        var group = new zrender.Group()
        var Point = new zrender.Circle({
            shape: {
                cx: 4,
                cy: 4,
                r: 1
            },
            style: {
                fill: Color
            }
        })
        var OutCircle = new zrender.Circle({
            shape: {
                cx: 4,
                cy: 4,
                r: 4
            },
            style: {
                fill: '#FFFFFF',
                stroke: Color
            }
        })
        group.on('mouseover', function () {
            Text.show()

            Text.attr('position', [Obj.x, Obj.y])
            Text.attr({
                style: {
                    text: Obj.txt
                }
            })
        }).on('mouseout', function () {
            Text.hide()
        })

        group.add(OutCircle)
        group.add(Point)
        group.attr('position', [Obj.x - 3, Obj.y - 3])

        return group
    },
    // 绘制圆圈中有H的圆
    drawHCircle (Obj, Color) {
        var group = new zrender.Group()
        var h = new zrender.Text({
            style: {
                text: 'H',
                fontSize: 8,
                textFill: Color
            },
            position: [2, -1]
        })
        var OutCircle = new zrender.Circle({
            shape: {
                cx: 5,
                cy: 5,
                r: 5
            },
            style: {
                fill: '#FFFFFF',
                stroke: Color
            }
        })
        group.on('mouseover', function () {
            Text.show()
            Text.attr('position', [Obj.x, Obj.y])
            Text.attr({
                style: {
                    text: Obj.txt
                }
            })
        }).on('mouseout', function () {
            Text.hide()
        })

        group.add(OutCircle)
        group.add(h)
        group.attr('position', [Obj.x - 4, Obj.y - 4])

        return group
    },
    drawLine (position, style) {
        console.log(style)
        var group = new zrender.Group()
        var line = new zrender.Line({
            shape: {
                x1: position.x1,
                y1: position.y1,
                x2: position.x2,
                y2: position.y2,
            },
            style: style
        })
        group.add(line)
        return group
    },
    // 绘制圆圈中有加号的圆
    drawAddCircle (Obj, Color) {
        var group = new zrender.Group()
        var h = new zrender.Text({
            style: {
                text: '+',
                fontSize: 8,
                textFill: Color
            },
            position: [2, -1]
        })
        var OutCircle = new zrender.Circle({
            shape: {
                cx: 5,
                cy: 5,
                r: 5
            },
            style: {
                fill: '#FFFFFF',
                stroke: Color
            }
        })
        group.on('mouseover', function () {
            Text.show()
            Text.attr('position', [Obj.x, Obj.y])
            Text.attr({
                style: {
                    text: Obj.txt
                }
            })
        }).on('mouseout', function () {
            Text.hide()
        })

        group.add(OutCircle)
        group.add(h)
        group.attr('position', [Obj.x - 4, Obj.y - 4])

        return group
    },
}