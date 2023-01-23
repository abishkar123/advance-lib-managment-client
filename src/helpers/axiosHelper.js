import axios from "axios"

const baseApiUrl =
  process.env === "production" ? "/api/v1" : process.env.REACT_APP_ROOT_URL
const userEP = baseApiUrl + "/user"
const bookEp = baseApiUrl + "/book"
const transactionEp = baseApiUrl + "/transaction"

// USER

const getUserId = () => {
  const user = JSON.parse(sessionStorage.getItem("user"))

  if (user) {
    return user?._id
  }
  return
}

export const postNewUser = async (userData) => {
  try {
    const { data } = await axios.post(userEP, userData)

    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const loginUser = async (userData) => {
  try {
    const { data } = await axios.post(userEP + "/login", userData)

    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

//update password

export const updatePassword = async (passInfo) => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const res =  await axios.patch(userEP + "/password-update", passInfo, {
      headers: {
        Authorization: userId,
      },
    })

    return res
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}
// BOOK


export const addBook = async (bookInfo) => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.post(bookEp, bookInfo, {
      headers: { Authorization: userId },
    })

    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const getBooks = async () => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.get(bookEp, {
      headers: {
        Authorization: userId,
      },
    })
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const borrowBook = async (bookId) => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.post(
      bookEp + "/borrow",
      { bookId },
      {
        headers: {
          Authorization: userId,
        },
      }
    )
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const deleteBook = async (bookId) => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.delete(bookEp, {
      data: { bookId },
      headers: {
        Authorization: userId,
      },
    })
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const getBorrowedBooks = async () => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.get(bookEp + "/borrowedBooks", {
      headers: {
        Authorization: userId,
      },
    })
    console.log(data)
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const returnBook = async (bookId) => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.patch(
      bookEp + "/return",
      { bookId },
      {
        headers: {
          Authorization: userId,
        },
      }
    )
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}


// TRANSACTION

export const getAllTransactions = async () => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.get(transactionEp, {
      headers: {
        Authorization: userId,
      },
    })
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}