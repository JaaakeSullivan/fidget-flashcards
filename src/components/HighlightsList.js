import React, { Component } from "react";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import FlashCardContainer from "./FlashCardContainer";
import { TransitionMotion, spring, presets } from "react-motion";
import HighlightListItem from "./HighlightListItem";

export default class HighlightsList extends Component {
  getDefaultStyles = () => {
    return this.props.studySet.map(studyItem => ({
      ...studyItem,
      key: studyItem._id,
      style: { height: 0, opacity: 1 }
    }));
  };

  getStyles = () => {
    const { studySet } = this.props;

    return studySet
      .filter(studyItem => {
        return this.props[studyItem.color];
      })
      .map((studyItem, i) => {
        return {
          key: studyItem._id,
          data: { ...studyItem },
          style: {
            height: spring(100, presets.wobbly),
            opacity: spring(1, presets.wobbly)
          }
        };
      });
  };

  willEnter() {
    return {
      height: 0,
      opacity: 1
    };
  }

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0)
    };
  }

  render() {
    return (
      <div>
        <TransitionMotion
          defaultStyles={this.getDefaultStyles()}
          styles={this.getStyles()}
          willLeave={this.willLeave}
          willEnter={this.willEnter}
        >
          {styles => (
            <List>
              <FlashCardContainer studySet={styles.map(item => item.data)} />
              {styles.map(({ key, style, data }) => {
                let speechAndDefinition,
                  highlightText,
                  //colorCode,
                  highlightNote = "";

                if (data !== undefined) {
                  if (data.savedDictionary && !data.savedDictionary.error) {
                    let { definitions, definitionIndex } = data.savedDictionary;
                    let speech = definitions[definitionIndex].speech_part;
                    let definition = definitions[definitionIndex].def;
                    speechAndDefinition = `: (${speech}) ${definition}`;
                  }

                  /*** TRIM STRING TO MAX CHARACTERS ***/
                  let clipString = stringToClip => {
                    let maxStringLength = 80;
                    return stringToClip.length >= maxStringLength
                      ? stringToClip.substr(0, maxStringLength) + "..."
                      : stringToClip;
                  };

                  highlightText =
                    clipString(data.selectedText) +
                    (speechAndDefinition !== undefined
                      ? speechAndDefinition
                      : "");
                  highlightNote = clipString(data.note);
                  let openHighlight = () => {
                    this.props.openHighlight(data);
                  };

                  return (
                    <div key={key} style={style}>
                      <HighlightListItem
                        openHighlight={openHighlight}
                        highlightText={highlightText}
                        highlightNote={highlightNote}
                        colorCode={data.colorCode}
                      />
                      <Divider />
                    </div>
                  );
                } else return null;
              })}
            </List>
          )}
        </TransitionMotion>
      </div>
    );
  }
}
