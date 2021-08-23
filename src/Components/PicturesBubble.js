import useStyles from "../Style/MyMessageBubbleStyle";

function PicturesBubble(props) {
  const { photos, handleFullView } = props;
  const classes = useStyles();
  return (
    <div>
      {photos &&
        photos.map((_, index) =>
          photos.length % 2 === 0
            ? index % 2 === 0 && (
                <div key={index} style={{ padding: "0px", margin: "0px" }}>
                  <img
                    className={classes.pictures}
                    src={photos[index]}
                    key={index}
                    style={{
                      padding: "0px",
                      margin: "0px",
                      marginRight: "2px",
                    }}
                    onClick={() => handleFullView(index)}
                  />
                  {index !== photos.length - 1 && (
                    <img
                      className={classes.pictures}
                      src={photos[index + 1]}
                      key={index + 1}
                      style={{
                        padding: "0px",
                        margin: "0px",
                      }}
                      onClick={() => handleFullView(index + 1)}
                    />
                  )}
                </div>
              )
            : (index === 0 && (
                <div key={index} style={{ padding: "0px", margin: "0px" }}>
                  <img
                    src={_}
                    key={index}
                    className={classes.pictures}
                    style={{
                      width: "202px",
                      padding: "0px",
                      margin: "0px",
                    }}
                    onClick={() => handleFullView(index)}
                  />
                </div>
              )) ||
              (index % 2 !== 0 && (
                <div key={index}>
                  <img
                    className={classes.pictures}
                    src={photos[index]}
                    key={index}
                    style={{
                      padding: "0px",
                      margin: "0px",
                      marginRight: "2px",
                    }}
                    onClick={() => handleFullView(index)}
                  />
                  {index !== photos.length - 1 && (
                    <img
                      className={classes.pictures}
                      src={photos[index + 1]}
                      key={index + 1}
                      style={{ padding: "0px", margin: "0px" }}
                      onClick={() => handleFullView(index + 1)}
                    />
                  )}
                </div>
              ))
        )}
    </div>
  );
}

export default PicturesBubble;
