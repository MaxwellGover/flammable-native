// Artists schema

/users
  uid
    displayName
    username
    avatar
    activePreview
    following
      uid

/usersAvailableTracks
  uid
    name
    storageUrl

/activePreviews
  uid
    previewId
      song
      video

/usersPastPreviews
  uid
    previewId
      song

/usernames
  usernameid
    username

// Get the song url from the purchased song and store here.
// Why? An artist could just to remove an activePreview but the fan still needs
// access to it if they purchased it.

/usersPurchasedStreams
  uid
    streams
      previewId
      song
      playsLeft

/likes
  previewId
    uid

/dislikes
  previewId
    uid

/purchases
  previewId
    uid

/comments
  previewId
    commentId
