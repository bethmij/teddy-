import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import showToast from "../alert/alert";
import api from "../api/api";
import { ToastContainer } from "react-toastify";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Swal from "sweetalert2";
import RestoreIcon from "@mui/icons-material/Restore";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const UsersView = () => {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState<boolean>(false);
  const [searchedUser, setSearchedUser] = useState<any>("");
  const [remove, setRemove] = useState<string>("");
  const navigate = useNavigate();
  const { getUser, getRole } = useAppContext();
  const [tableLoading, setTableLoading] = useState(true);

  useEffect(() => {
    const user = getUser();
    const role = getRole();

    if (!user || !role) {
      navigate("/auth");
      return;
    }

    if (role === "USER") {
      navigate("/account");
      return;
    }
  }, [getUser()]);

  useEffect(() => {
    setLoading(false);
    getAllUsers();
  }, []);

  useEffect(() => {
    if (search != "") {
      setSearchError(false);
    }
  }, [search]);

  useEffect(() => {
    if (searchedUser != "") {
      setUsers([searchedUser]);
      return;
    }
  }, [searchedUser]);

  const getUserDetails = async () => {
    if (search == "" || search == null || search == undefined) {
      return setSearchError(true);
    }
    setSearchError(false);
    if (searchedUser != "" && searchedUser.itemName == search) {
      return;
    }
    setTableLoading(true);
    try {
      const response = await api.get(`/user/${search}`);
      if (response.status === 200) {
        setSearchedUser(response.data.data);
        showToast("User is Found", "success");
        setTableLoading(false);
        return;
      }
    } catch (error: any) {
      setTableLoading(false);
      if (error.response && error.response.status === 404) {
        showToast("User Not Found", "error");
      } else if (error.response && error.response.status === 400) {
        showToast("Invalid credentials", "error");
      }
      setSearchedUser("");
    }
  };

  const getAllUsers = async () => {
    setTableLoading(true);
    try {
      const response = await api.get(`/user/filterd/all`);
      if (response.status === 200) {
        setUsers(response.data.data);
        setTableLoading(false);
        return;
      }
      showToast("An unexpected error occurred", "error");
      setTableLoading(false);
    } catch (err) {
      showToast("Error getting User", "error");
      setTableLoading(false);
    }
  };

  const removeUser = async () => {
    setTableLoading(true);
    try {
      const response = await api.delete(`/user/${remove}`);
      if (response.status === 204) {
        Swal.fire({
          title: "User Remove Successfully!",
          icon: "success",
        });
        return getAllUsers();
      }
      Swal.fire({
        title: "An unexpected error occurred",
        icon: "error",
      });
      setTableLoading(false);
    } catch (err) {
      Swal.fire({
        title: "Error Removing User",
        icon: "error",
      });
      setTableLoading(false);
    }
  };

  const extractDateOnly = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <div className="flex flex-row justify-between w-full mb-8">
            <p className="text-2xl font-medium text-gray-600 ">
              All <span className="font-medium text-[#E8C2A5]">Users</span>
            </p>

            <div className="flex flex-row gap-1 max-w-md items-center">
              {searchedUser != "" && (
                <RestoreIcon
                  sx={{
                    width: 25,
                    height: 25,
                    marginRight: 0.5,
                    color: "gray",
                  }}
                  className=""
                  onClick={() => {
                    setRemove("");
                    setSearch("");
                    setSearchError(false);
                    setSearchedUser("");
                    getAllUsers();
                  }}
                />
              )}
              <img
                onClick={getUserDetails}
                className="w-5 h-5 mr-2 hover:bg-[#e8c2a5c7] hover:rounded-full"
                src={assets.search_icon}
                alt="search icon"
              />

              <div className="flex flex-row gap-1 max-w-md items-center relative">
                <input
                  name="email"
                  type="text"
                  placeholder="Search User by Email"
                  className="outline-none py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E8C2A5] focus:border-transparent"
                  onChange={(e: any) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                  required
                />
                {searchError && (
                  <p className="mt-2 text-sm text-red-500/80 absolute -bottom-6 ">
                    Enter User Email
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center max-w-5xl max-h-[30vw] w-full overflow-y-scroll scrollbar-hide rounded-md bg-white border border-gray-500/20">
            <div className="w-full">
              <table className="w-full table-fixed">
                <thead className="text-gray-900 text-sm text-left bg-[#F8F2EE] sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 font-medium text-center truncate">
                      User
                    </th>
                    <th className="px-4 py-3 font-medium text-center truncate">
                      Name
                    </th>
                    <th className="px-4 py-3 font-medium text-center truncate">
                      Email
                    </th>
                    <th className="px-4 py-3 font-medium text-center truncate">
                      Contact
                    </th>
                    <th className="px-4 py-3 font-medium text-center truncate">
                      Join Date
                    </th>
                    <th className="px-6 py-3 font-medium text-center truncate">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-500">
                  {tableLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8">
                        <div className="flex justify-center items-center">
                          <CircularProgress style={{ color: "#E8C2A5" }} />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    users.map((userDetail: any, index: any) => (
                      <tr key={index} className="border-t border-gray-500/20">
                        <td className="pl-2 py-2 truncate">
                          <div className="bg-[#F8F2EE] rounded flex justify-center items-center">
                            <img
                              src={
                                userDetail.image
                                  ? userDetail.image
                                  : assets.image_error
                              }
                              alt=""
                              className="w-16 h-16 object-cover mix-blend-multiply"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500/90 font-medium">
                          {userDetail.name}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500/90 font-medium">
                          {userDetail.email}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500/90 font-medium">
                          {userDetail.contact}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500/90 font-medium">
                          {extractDateOnly(userDetail.createdAt)}
                        </td>
                        <td className="px-11 py-3 text-gray-500/90 font-medium">
                          <button
                            onClick={() => setRemove(userDetail.email)}
                            className="flex items-center gap-1 px-3.5 py-1.5 bg-[#e8c2a5c7] rounded-full text-[#895025] hover:bg-[#E8C2A5]"
                          >
                            <span className="hidden md:block">Remove</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <ToastContainer className={"overflow-x-hidden"} />

          <Dialog
            open={remove != ""}
            onClose={() => setRemove("")}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Remove User</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do You Want Remove User
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setRemove("")} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  removeUser();
                  setRemove("");
                }}
                color="secondary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default UsersView;
