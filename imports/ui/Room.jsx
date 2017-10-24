import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SoundEngine from '../core/SoundEngine.js';

import InstrumentSelect from './InstrumentSelect.jsx';
import Drums from './Drums.jsx';
import Bass from './Bass.jsx';

import './css/RoomStyle.css';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "InstrumentSelect",
      instrument: "",
      engine: new SoundEngine(props.song),
      beat: -1,
      bar: 0,
      playing: false
    };
  }

  componentDidMount() {
    var tInterval = 60000 / (this.props.song.tempo * 4);
    this.interval = setInterval(() => {
      if(this.state.playing) {
        var currentBar = this.state.bar;
        let currentBeat = this.state.beat;
        currentBeat++;
        if (currentBeat === 16) {
          currentBeat = 0;
          currentBar++;
          if (currentBar === 4) {
            currentBar = 0;
          }
        }
        this.PlaySounds(currentBeat, currentBar);
        this.setState({beat: currentBeat, bar: currentBar});
      }
    }, tInterval);
  }

  PlaySounds(currentBeat, currentBar) {
    if (currentBeat === 0) {
      this.state.engine.PlayBGSounds(currentBar);
    }
    if (this.props.song.drums.user !== "") {
      for (var i = 0; i < this.props.song.drums.pattern.length; i++) {
        if (this.props.song.drums.pattern[i][currentBeat] === 'x') {
          this.state.engine.PlayDrumSound(i);
        }
      }
    }
    if (this.props.song.bass.user !== "") {
      if (this.props.song.bass.pattern[currentBeat] !== '-') {
        this.state.engine.PlayBassSound(this.props.song.bass.pattern[currentBeat], currentBar, this.props.song.bass.sound);
      }
    }
  }

  SelectInstrument(instrument) {
    var song = this.props.song;
    song[instrument].user = this.props.user;
    this.props.update(song);
    this.setState({
      view: "Instrument",
      instrument: instrument,
      playing: true
    });
  }

  render() {
    if(this.state.view === "InstrumentSelect") {
      return (
        <InstrumentSelect
          song={this.props.song}
          select={(instr) => this.SelectInstrument(instr)}/>
      );
    } else {
      return (
        <div id="Room" className={"page "+this.state.instrument}>
          {this.RenderInstrument()}
          {this.RenderControls()}
        </div>
      );
    }
  }

  RenderInstrument() {
    switch(this.state.instrument) {
      case "drums":
      return (
        <Drums
          pattern={this.props.song.drums}
          beat={this.state.beat}
          update={(p) => this.UpdatePattern(p, "drums")}/>
      );
      break;
      case "bass":
      return (
        <Bass
          pattern={this.props.song.bass}
          beat={this.state.beat}
          update={(p) => this.UpdatePattern(p, "bass")}/>
      );
      break;
      case "keys":
      break;
      case "solo":
      break;
    }
  }

  RenderControls() {

  }

  UpdatePattern(pattern, instrument) {
    var song = this.props.song;
    song[instrument] = pattern;
    this.props.update(song);
  }
}

Room.propTypes = {
  session: PropTypes.bool.isRequired,
  song: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  saveSong: PropTypes.func.isRequired
}

export default Room;
