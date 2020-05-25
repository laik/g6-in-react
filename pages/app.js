import React, { useEffect, useState } from 'react';
import { data } from './data';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import { NodeTooltips, EdgeToolTips, NodeContextMenu } from './component'
import './registerShape';



export default function () {
  const ref = React.useRef(null)
  let graph = null

  // 边tooltip坐标
  const [showEdgeTooltip, setShowEdgeTooltip] = useState(false)
  const [edgeTooltipX, setEdgeTooltipX] = useState(0)
  const [edgeTooltipY, setEdgeTooltipY] = useState(0)

  // 节点tooltip坐标
  const [showNodeTooltip, setShowNodeTooltip] = useState(false)
  const [nodeTooltipX, setNodeToolTipX] = useState(0)
  const [nodeTooltipY, setNodeToolTipY] = useState(0)

  // 节点ContextMenu坐标
  const [showNodeContextMenu, setShowNodeContextMenu] = useState(false)
  const [nodeContextMenuX, setNodeContextMenuX] = useState(0)
  const [nodeContextMenuY, setNodeContextMenuY] = useState(0)


  const bindEvents = () => {
    // 监听edge上面mouse事件
    graph.on('edge:mouseenter', evt => {
      const { item, target } = evt
      // debugger
      const type = target.get('type')
      if (type !== 'text') {
        return
      }
      const model = item.getModel()
      const { endPoint } = model
      // y=endPoint.y - height / 2，在同一水平线上，x值=endPoint.x - width - 10
      const y = endPoint.y - 35
      const x = endPoint.x - 150 - 10
      const point = graph.getCanvasByPoint(x, y)
      setEdgeTooltipX(point.x)
      setEdgeTooltipY(point.y)
      setShowEdgeTooltip(true)
    })


    // 监听node上面mouse事件
    graph.on('node:mouseenter', evt => {
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)

      setNodeToolTipX(point.x)
      setNodeToolTipY(point.y)
      setShowNodeTooltip(true)

      console.log("-------------------->node:mouseenter", evt);
    })

    // 节点上面触发mouseleave事件后隐藏tooltip和ContextMenu
    graph.on('node:mouseleave', () => {
      setShowNodeTooltip(false)
      setShowNodeContextMenu(false)
    })

    // 监听节点上面右键菜单事件
    graph.on('node:contextmenu', evt => {
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)
      setNodeContextMenuX(point.x)
      setNodeContextMenuY(point.y)
      setShowNodeContextMenu(true)
    })
  }


  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current),
        width: 1500,
        height: 800,
        modes: {
          // default: ['drag-canvas', 'drag-node', 'drag-combo'],
          // 支持的 behavior
          // default: ['drag-canvas', 'zoom-canvas'],
          default: ['drag-canvas', 'drag-node', 'drag-combo', 'name'],
          edit: ['click-select'],
        },

        // 节点上左右上下四个方向上的链接circle配置
        linkPoints: {
          top: false,
          right: true,
          bottom: true,
          left: true,
          // circle的大小
          size: 3,
          lineWidth: 1,
          fill: '#72CC4A',
          stroke: '#72CC4A',
        },

        // 节点中icon配置
        logoIcon: {
          // 是否显示icon，值为 false 则不渲染icon
          show: true,
          x: 0,
          y: 0,
          // icon的地址，字符串类型
          img:
            'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
          width: 16,
          height: 16,
          // 用于调整图标的左右位置
          offset: 0,
        },

        // 节点中表示状态的icon配置
        stateIcon: {
          // 是否显示icon，值为 false 则不渲染icon
          show: true,
          x: 0,
          y: 0,
          // icon的地址，字符串类型
          img:
            'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
          width: 16,
          height: 16,
          // 用于调整图标的左右位置
          offset: -5,
        },

        defaultNode: {
          shape: 'pipeline-node',
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 10
            }
          },
          style: {
            stroke: '#72CC4A',
            width: 150
          }
        },

        defaultEdge: {
          shape: 'polyline'
        },

        fitView: true,

        layout: {
          type: 'dagre',
          rankdir: 'LR',
          nodesep: 30,
          ranksep: 100
        },

        nodeStateStyles: {
          hover: {
            lineWidth: 2,
            stroke: '#1890ff',
            fill: '#e6f7ff',
          },
        },

      })
    }


    graph.on('node:mouseenter', evt => {
      const { item } = evt;
      graph.setItemState(item, 'hover', true);
    }
    );

    graph.on('edge:mouseleave', () => {
      setShowEdgeTooltip(false)
    })


    // Add a new node
    graph.on('node:click', evt => {
      const { item } = evt;
      // TODO 需要在这里增加node
      console.log("------------------------------------------------", item);

      const nodeid = Number(item._cfg.id) + 1;
      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)
      graph.addItem('node',
        {
          id: nodeid,
          title: 'Task' + nodeid,
          error: false,
          panels: [
            { title: 'Proc', value: '11%' },
            { title: 'Time', value: '20s' },
            { title: 'Err', value: 'N' }
          ],
          x: point.x + 50,
          y: point.y
        },
      );
    });


    graph.data(data)

    graph.render()

    const edges = graph.getEdges()
    edges.forEach(edge => {
      const line = edge.getKeyShape()
      const stroke = line.attr('stroke')
      const targetNode = edge.getTarget()
      targetNode.update({
        style: { stroke }
      })
    })
    graph.paint()

    bindEvents()
  }, [])

  return (
    <div ref={ref}>
      {showEdgeTooltip && <EdgeToolTips x={edgeTooltipX} y={edgeTooltipY} />}
      {showNodeTooltip && <NodeTooltips x={nodeTooltipX} y={nodeTooltipY} />}
      {showNodeContextMenu && <NodeContextMenu x={nodeContextMenuX} y={nodeContextMenuY} />}
    </div>
  );
}
