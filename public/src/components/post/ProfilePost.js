import React, { useState } from "react";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import { JsonRpcProvider, Wallet, Contract } from 'ethers';
function ProfilePost({ postImg, likesCount, onReportClick }) {
  //const [reportMessage, setReportMessage] = useState("");
  const [report,setReport]=useState(false)
  const privateKey = '7348ba226c6b2971b04b189f8050cfcbe4c5817c9dbef36e503a00e350b633eb';
  const provider = new JsonRpcProvider('https://sepolia.infura.io/v3/2a5ca87a25d54c7bb3972e7ac14d2a7f')
  const wallet = new Wallet(privateKey, provider);
  const voters = ['0x92d92964E5CD5e869272E958DFeBaB9d6723Caa9', '0xD7FF84C057289EFFA598A3eC6a6BfF32C9475D30', '0x5A916b03fd3A8807Face0BA02F10CFd92ecA31Fb'];
  const daoContractAddress = '0x67f71a872D8fDE239743E5B2D14b3151A2fbD50a';
  const daoContract = new Contract(daoContractAddress, [
    'function createProposal(address[] _canVote) public',
    'function voteOnProposal(uint256 _id, bool _vote) public',
    'function countVotes(uint256 _id) public',
  ], wallet);
  const changeReport=()=>{
    setReport(true);
    
  }
  const backReport=()=>{
    setReport(false)
  }
  const voteOnProposal=async (voters, imgUrl) =>{
  
  const tx = await daoContract.createProposal(voters);
    await tx.wait();
  alert('Proposal created successfully.');
  
  let data = await axios.post('http://localhost:3001/report',{
    img:imgUrl
  })
  console.log(data.data);
  changeReport();
  }


  return (
    <>
      <div className="flex w-[100%] h-[300px] relative my-1 p-1 rounded-2xl border transition-all duration-500">
        <img src={postImg} alt="" className="w-[100%] rounded-2xl" />
        <div className="absolute left-[50%] top-[50%] space-x-2 items-center justify-center hidden group-hover:flex transition-all duration-500">
          <h1 className="text-deepBlue leading-10 white text-lg font-bold">
            {likesCount}
          </h1>{" "}
          <AiFillHeart size={40} style={{ color: "red" }} />
        </div>
        {
  report ? (
    <>
    <div>
  <button className="report-button absolute top-2 right-2" onClick={() => voteOnProposal(voters,postImg)}>
    Yes
  </button>
  <button className="report-button absolute top-2 right-16" onClick={backReport}>
    No
  </button>
</div>

    </>
  ) : (
    <button className="report-button absolute top-2 right-2" onClick={changeReport}>
      Report
    </button>
  )
}

        
      </div>
    </>
  );
}

export default ProfilePost;
//{reportMessage && <p>{reportMessage}</p>}