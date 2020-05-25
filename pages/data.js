export const data = {
  nodes: [
    {
      id: '1',
      title: 'Task1',
      error: true,
      panels: [
        { title: 'Proc', value: '11%' },
        { title: 'Time', value: '20s' },
        { title: 'Err', value: 'N' }
      ],
      x: 150,
      y: 100
    },
    {
      id: '2',
      title: 'Task2',
      error: true,
      panels: [
        { title: 'Proc', value: '11%' },
        { title: 'Time', value: '20s' },
        { title: 'Err', value: 'N' }
      ],
      x: 300,
      y: 100,
    },
    {
      id: '3',
      title: 'Task3',
      error: false,      
      panels: [
        { title: 'Proc', value: '11%' },
        { title: 'Time', value: '20s' },
        { title: 'Err', value: 'N' }
      ], 
      x: 450,
      y: 300
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
      data: {
        type: '',
        amount: "",
        date: ''
      }
    },
    {
      source: '1',
      target: '3',
      data: {
        type: '',
        amount: '',
        date: ''
      }
    },
  ],
};
