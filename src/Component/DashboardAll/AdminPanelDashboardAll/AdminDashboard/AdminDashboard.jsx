import { useState } from 'react';
import "./AdminDashboard.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';



const AdminDashboard = () => {

    const [tabState, setTabState] = useState(1);
    let [loadingLogin, setLoadingLogin] = useState(false)
    let [success, setSuccess] = useState("")
    let [error, setError] = useState("")
    // =======================================================

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // ===========================================================================================================
    // Admin Website (Banner) Work Here !!
    // =======================================================
    // All Banner Data Get Here !
    // =======================================================
    const { data: AllBannerOfWebsite = [], refetch } = useQuery({
        queryKey: ["AdminDashboardAllWorkHere-AllBanner"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/AdminDashboardAllWorkHere/AllBanner");
            return res.json();
        },
    });
    // Admin add website banner work Here !
    // =======================================================
    let AdminAddBannerOfWebsite = (data) => {
        setLoadingLogin(true)
        setError("")
        setSuccess("")
        let fromData = new FormData()
        fromData.append("image", data.BannerImage[0])
        fetch(`https://api.imgbb.com/1/upload?key=187099e910972209cba3b8227d657e56`, {
            method: "POST",
            body: fromData
        })
            .then(res => res.json())
            .then(imageResponse => {
                if (imageResponse.success) {

                    // console.log(imageResponse.secure_url);

                    let BannerImageUrl = imageResponse.data.display_url
                    let date = moment().format("D/MM/YY , hh:mm A")

                    let allInfo = { BannerImageUrl, date }
                    // console.log(allInfo)

                    // save user Database 
                    // ==========================
                    fetch("http://localhost:5000/AdminDashboardAllWorkHere/BannerPost", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(allInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data)
                            if (data.insertedId) {
                                reset()
                                refetch()
                                setLoadingLogin(false)
                                setSuccess("Banner Successfully")
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Banner Add Successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })

                } else {
                    setLoadingLogin(false)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Network Connection Lost, Try agin",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    // ===========================================================================================================
    // Admin Create Coupon Bonus here !!
    // =======================================================
    // All Coupon Code Data Get Here !
    // =======================================================
    const { data: AllCouponCode = [] } = useQuery({
        queryKey: ["AdminDashboardAllWorkHere-AllCouponCode"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/AdminDashboardAllWorkHere/AllCouponCode");
            return res.json();
        },
    });













    return (
        <div className='AdminViewPaymentRequestAll bg-[#F6F6F6]'>
            <div className='md:px-4 my-4'>

                {/* ====================================================================== */}
                {/* Delivery monitoring | all dat show here
                {/* ====================================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-md  mt-10">

                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>Dashboard Working Here</h3>

                    {/* Tabs with Different type of category parcel*/}
                    {/* =============================================== */}
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 space-x-4 mb-4">

                            <button onClick={() => setTabState(1)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Banner Image All
                            </button>

                            <button onClick={() => setTabState(2)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Create Coupon Bonus
                            </button>
                            <button onClick={() => setTabState(3)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 3 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Logo Change
                            </button>
                            <button onClick={() => setTabState(4)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 4 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Admin Give bonus Percent
                            </button>
                        </div>
                    </div>

                    {/* Tab Content All types parcel data show */}
                    {/* ============================================ */}
                    <div className="">

                        {/* ============================================ */}
                        {/* Banner All Data See Here !!*/}
                        {/* ============================================ */}
                        {tabState === 1 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                                    <form onSubmit={handleSubmit(AdminAddBannerOfWebsite)}>
                                        <div className="flex justify-between items-center pb-4">
                                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Banner Image</h2>
                                            {/* Search Section (Pending)*/}
                                            {/* ==================================== */}
                                            <div className="flex items-center gap-2">
                                                <input
                                                    {...register("BannerImage", { required: true })}
                                                    type="file"
                                                    className="border border-gray-300 rounded-md px-6 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                                <button
                                                    type="submit"
                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Merchant Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Create Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                    AllBannerOfWebsite.slice().reverse().map((Banner) => (
                                                        <tr key={Banner?._id}>
                                                            <td>
                                                                <div className="w-24 h-24 rounded-md overflow-hidden border border-gray-300">
                                                                    <img
                                                                        src={Banner?.BannerImageUrl}
                                                                        alt="Banner"
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-500">{Banner?.date}</p>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-sm btn-outline btn-primary"
                                                                    onClick={() => {
                                                                        Swal.fire({
                                                                            title: "Are you sure?",
                                                                            text: "You won't be able to revert this!",
                                                                            icon: "warning",
                                                                            showCancelButton: true,
                                                                            confirmButtonColor: "#3085d6",
                                                                            cancelButtonColor: "#d33",
                                                                            confirmButtonText: "Yes, delete it!"
                                                                        }).then((result) => {
                                                                            if (result.isConfirmed) {

                                                                                fetch(`http://localhost:5000/AdminDashboardAllWorkHere/BannerDelete/${Banner?._id}`, {
                                                                                    method: "DELETE",
                                                                                })
                                                                                    .then(res => res.json())
                                                                                    .then(data => {
                                                                                        if (data.deletedCount > 0) {
                                                                                            refetch()
                                                                                            Swal.fire({
                                                                                                position: "top-end",
                                                                                                icon: "success",
                                                                                                title: "Delete Success",
                                                                                                showConfirmButton: false,
                                                                                                timer: 1500
                                                                                            })
                                                                                        }
                                                                                        // console.log(data)
                                                                                    })
                                                                            }

                                                                        });
                                                                    }}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* ============================================ */}
                        {/* Create Coupon Code Here */}
                        {/* ============================================ */}
                        {tabState === 2 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="flex justify-between items-center pb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Coupon Code Create</h2>
                                        {/* Search Section (Delivered)*/}
                                        {/* ==================================== */}
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            let AmountBunas = e.target.Amount.value
                                            let CouponCode = e.target.CouponCode.value
                                            let date = moment().format("D/MM/YY , hh:mm A")
                                            let allInfo = { AmountBunas, CouponCode, date, status: "unUsed" }

                                            // save user Database 
                                            // ==========================
                                            fetch("http://localhost:5000/AdminDashboardAllWorkHere/CouponCodeCreate", {
                                                method: "POST",
                                                headers: {
                                                    "content-type": "application/json"
                                                },
                                                body: JSON.stringify(allInfo)
                                            })
                                                .then(res => res.json())
                                                .then(data => {
                                                    // console.log(data)
                                                    if (data.insertedId) {
                                                        e.target.reset()
                                                        refetch()
                                                        setLoadingLogin(false)
                                                        setSuccess("Coupon Create Successfully")
                                                        Swal.fire({
                                                            position: "top-end",
                                                            icon: "success",
                                                            title: "Coupon Create Successfully",
                                                            showConfirmButton: false,
                                                            timer: 1500
                                                        })
                                                    }
                                                })
                                        }}>
                                            <div className="flex items-center gap-2">
                                                <div className="">
                                                    <input
                                                        type="number"
                                                        name="Amount"
                                                        placeholder="Enter Amount"
                                                        className="border mb-[4px] border-gray-300 rounded-md px-6 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <br />
                                                    <input
                                                        type="number"
                                                        name="CouponCode"
                                                        placeholder="Enter Coupon Code"
                                                        className="border border-gray-300 rounded-md px-6 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Coupon Code</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount Bunas</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                    AllCouponCode.slice().reverse().map((Coupon) => (
                                                        <tr key={Coupon?._id}>
                                                            <td>
                                                                <p className="text-sm text-gray-500">{Coupon?.CouponCode}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-500">{Coupon?.AmountBunas}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-500">{Coupon?.date}</p>
                                                            </td>
                                                            <td>
                                                                <p className={`${Coupon?.status === "unUsed" ? "text-green-600" : "text-red-600"} text-sm `}>{Coupon?.status}</p>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-sm btn-outline btn-primary"
                                                                    onClick={() => {
                                                                        Swal.fire({
                                                                            title: "Are you sure?",
                                                                            text: "You won't be able to revert this!",
                                                                            icon: "warning",
                                                                            showCancelButton: true,
                                                                            confirmButtonColor: "#3085d6",
                                                                            cancelButtonColor: "#d33",
                                                                            confirmButtonText: "Yes, delete it!"
                                                                        }).then((result) => {
                                                                            if (result.isConfirmed) {

                                                                                fetch(`http://localhost:5000/AdminDashboardAllWorkHere/DeleteCouponCode/${Coupon?._id}`, {
                                                                                    method: "DELETE",
                                                                                })
                                                                                    .then(res => res.json())
                                                                                    .then(data => {
                                                                                        if (data.deletedCount > 0) {
                                                                                            Swal.fire({
                                                                                                position: "top-end",
                                                                                                icon: "success",
                                                                                                title: "Delete Success",
                                                                                                showConfirmButton: false,
                                                                                                timer: 1500
                                                                                            })
                                                                                        }
                                                                                        // console.log(data)

                                                                                        refetch()
                                                                                    })

                                                                            }

                                                                        });
                                                                    }}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* ======================================================= */}
                        {/* Parcel (Partially Delivered) Type category data show */}
                        {/* ======================================================= */}
                        {tabState === 3 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">



                                </div>
                            </div>
                        }
                        {/* ============================================ */}
                        {/* Parcel (cancel) Type category data show */}
                        {/* ============================================ */}
                        {tabState === 4 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="flex justify-between items-center pb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Give Percentage Bonus to user</h2>
                                        {/* Search Section (Delivered)*/}
                                        {/* ==================================== */}
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            let BonusPercent = e.target.BonusPercent.value
                                            let allInfo = { BonusPercent }

                                            // save user Database 
                                            // ==========================
                                            fetch("http://localhost:5000/AdminGivePercentageBonusToUser", {
                                                method: "PATCH",
                                                headers: {
                                                    "content-type": "application/json"
                                                },
                                                body: JSON.stringify(allInfo)
                                            })
                                                .then(res => res.json())
                                                .then(data => {
                                                    // console.log(data)
                                                    if (data.insertedId) {
                                                        e.target.reset()
                                                        refetch()
                                                        setLoadingLogin(false)
                                                        setSuccess("Percentage bonus give Successfully")
                                                        Swal.fire({
                                                            position: "top-end",
                                                            icon: "success",
                                                            title: "Coupon Create Successfully",
                                                            showConfirmButton: false,
                                                            timer: 1500
                                                        })
                                                    }
                                                })
                                        }}>
                                            <div className="flex items-center gap-2">
                                                <div className="">
                                                    <input
                                                        type="number"
                                                        name="BonusPercent"
                                                        placeholder="Enter Amount"
                                                        className="border mb-[4px] border-gray-300 rounded-md px-6 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;