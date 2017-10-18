const initialState = {
  lines: [
    { content: '', syllables: 0 },
    { content: '', syllables: 0 },
    { content: '', syllables: 0 },
  ]
};

const lines = (state, action) => {
  switch (action.type) {
    case 'HAIKU_LINE_KEYUP': {
      const { index, content, syllables } = action;
      return [
        ...state.slice(0, index),
        { content, syllables },
        ...state.slice(index + 1)
      ];
    }
    default: return state;
  }
};

const haikuApp = (state = initialState, action) => {
  switch (action.type) {
    case 'HAIKU_LINE_KEYUP':
      return Object.assign({}, state, {
        lines: lines(state.lines, action)
      });
    default: return state;
  }
};

export default haikuApp;