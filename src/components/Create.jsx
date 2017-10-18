import React from 'react';
import { connect } from 'react-redux';
import { haikuLineKeyUp } from '../action-creators';
import AddHaiku from './presentation/AddHaiku';
import Row from './container/Row';

const syllable = require('syllable');

const Buttons = (props) => 
  <div className="flex-container">
    <AddHaiku />
  </div>

const mapStateToProps = (state) => state.haikuApp.haiku;

class Create extends React.Component {

  focusNextInput (index) {
    if (index < this.rows.length - 1) {
      this.rows[index + 1].focus();
    }
  }

  setFirstChar (index, c) {
    if (index < this.rows.length - 1) {
      this.rows[index + 1].setFirstChar(c);
    }
  }

  onLineKeyUp (index, evt) {
    const content = evt.target.value;
    const syllables = syllable(content);
    const maxSyllableCount = +evt.target.getAttribute('maxsyllablecount');
    
    if (syllables <= maxSyllableCount) {
      /*
       * focus the next row when 
       * space or enter key was pressed at max syllable count
       */
      if (syllables === maxSyllableCount && (evt.keyCode === 32 || evt.keyCode == 13)) {
        this.focusNextInput(index);
      }
      this.props.dispatch(haikuLineKeyUp(content, syllables, index));
    }
    else {
      /*
       * focus the next row when 
       * a character key was pressed and the syllable count > maxSyllableCount
       */
      evt.target.value = this.props.lines[index].content.trim();
      this.focusNextInput(index);

      /*
       * hackish solution to auto enter the next character.  
       * does not correctly set syllable count for next row.
       */
      this.setFirstChar(index, content.split('').reverse()[0]);
    }
  }

  constructor () {
    super();
    this.rows = new Array(3).fill(null);
    this.focusNextInput = this.focusNextInput.bind(this);
  }

  render () {
    let { lines } = this.props;

    return (
      <div className="lines flex-container">
        <Row 
          ref={row => this.rows[0] = row}
          onLineKeyUp={this.onLineKeyUp.bind(this, 0)}
          index={0} 
          syllables={lines[0].syllables}
          lineContent={lines[0].content}
          maxSyllableCount={5} />
        <Row 
          ref={row => this.rows[1] = row}
          onLineKeyUp={this.onLineKeyUp.bind(this, 1)}
          index={1} 
          syllables={lines[1].syllables}
          lineContent={lines[1].content}
          maxSyllableCount={3} />
        <Row 
          ref={row => this.rows[2] = row}
          onLineKeyUp={this.onLineKeyUp.bind(this, 2)}
          index={2} 
          syllables={lines[2].syllables}
          lineContent={lines[2].content}
          maxSyllableCount={5} />
        <Buttons 
          inspire={this.inspire} />
      </div>
    );
  }
};

export default connect(mapStateToProps, null)(Create);
