import React from 'react';
import "./ClimedDetails.css"
import useRole from '../../../Hook/useRole';

const ClimedDetails = ({ userSubscription, handleUpdateUserClime, btnDisable }) => {
    // console.log(userSubscription)

    let { SubDayBonus, SubPrice, SubscriptionDay, SubscriptionId, TotalProfite, UseRefBonusUser, UserEmail, UserName, hours, status, useRefCode, userId, _id } = userSubscription


    const [roles] = useRole()
    let { LastName, Password, UseRefCode, date, email, name, photo, referId, role, userBalance } = roles



    return (
        <div className="ClimedDetailsParent mt-6">

            <div className="ClimeOptions ">
                <div className="flex items-center justify-between">

                    <h5> {userSubscription?.status === "pending" ? "আপনার সাবস্ক্রিপশন পেন্ডিংয়ে রয়েছে অপেক্ষা করুন" : userSubscription?.hours !== 0 ? "আপনার সাবস্ক্রিপশন ক্লাইম করুন সকাল 9 টা A.M" : "আপনার সাবস্ক্রিপশন ক্লাইম করুন"}  </h5>

                    {
                        userSubscription?.status === "pending" ?
                            <button>Wite for Approved</button>
                            : userSubscription?.hours !== 0 ?
                                <button>You can clime tomorrow !</button>
                                :
                                <button disabled={btnDisable} onClick={() => handleUpdateUserClime(userSubscription?.SubDayBonus, userSubscription?.UserEmail, SubscriptionId)}>Clime Now</button>
                    }
                </div>
            </div>

            {/* =============================== */}

            <div className="userSubInformation ">

                <div className="info flex items-center justify-between">
                    <h3>Subscription Status :</h3>
                    <h4 className='ml-[73px]'>{userSubscription ? userSubscription?.status : "No Subscription Status Please Buy"}</h4>
                </div>
                <div className="info flex items-center justify-between">
                    <h3>My Subscription Price :</h3>
                    <h4 className='ml-[73px]'>{userSubscription ? userSubscription?.SubPrice : "No Subscription Please Buy"} Tk.</h4>
                </div>
                <div className="info flex items-center justify-between">
                    <h3>My Clime Bonus :</h3>
                    <h4 className='ml-[73px]'>{userSubscription ? userSubscription?.SubDayBonus : "Before Buy a Subscription "} Tk.</h4>
                </div>
                <div className="info flex items-center justify-between">
                    <h3>MSubscription Duration :</h3>
                    <h4 className='ml-[73px]'>{userSubscription ? userSubscription?.SubscriptionDay : "No Subscription Please Buy"} Day.</h4>
                </div>

            </div>

        </div>
    );
};

export default ClimedDetails;