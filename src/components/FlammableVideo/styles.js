const styles = {
  container: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 5,
    backgroundColor: '#000'
  },
  header: {
    backgroundColor: 'transparent',
    zIndex: 1,
    margin: 10,
  },
  displayName: {
    fontSize: 16,
    color: '#fff',
  },
  buttonStyle: {
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 5,
    marginTop: 580,
    width: '100%',
  },
  buttonTitleStyle: {
    color: '#000',
  },
  deleteButton: {
    backgroundColor: 'red',
    height: 60,
    borderRadius: 5,
    marginTop: 600,
    width: '100%',
  },
  deleteButtonTextStyle: {
    color: '#fff',
  },
  modal: {
    flex: 1,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  }
}

export default styles;
