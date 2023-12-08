import './App.css';
import {FaChevronDown, FaChevronUp, FaPlus, FaToggleOn, FaToggleOff, FaEllipsisH,FaQuestionCircle , FaArrowAltCircleUp } from 'react-icons/fa';
import { HiMiniArrowUpTray } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";
import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronUp } from '@fortawesome/free-solid-svg-icons'


function App() {

  const [currentPage, setCurrentPage] = useState(2);



  // Additional state to manage the visibility of pages
  const [pg2, setPg2] = useState(true);
  const [pg3, setPg3] = useState(false);
  const [pg4, setPg4] = useState(false);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Update the visibility of pages based on the clicked page number
    if (pageNumber === 2) {
      setPg2(true);
      setPg3(false);
      setPg4(false);

    } else if (pageNumber === 3) {
      setPg2(false);
      setPg3(true);
      setPg4(false);

    } else {
      setPg2(false);
      setPg3(false);
      setPg4(true);

    }
  };

  return (
    <>
      <PageNumbers handlePageClick={handlePageClick} currentPage={currentPage}  />
      { pg2 && <Page2 />}
      { pg3 &&  <Page3 />}
      { pg4 &&  <Page4 />}

      
    </>
  );
}



/******************************* Page Numbers Navbar ********************* */

function PageNumbers({handlePageClick, currentPage}){

  


  return (
      <>
        <div className='pageNumberDiv'>
          <div  id='1' className='pageNumbers first' >1</div>
          <div className={`pageNumberLineBetween ${currentPage===2 ? 'color.between.line'  : ''}`}></div>
          <div onClick={() => handlePageClick(2)} id='2' className={`pageNumbers ${currentPage === 2 ? 'color-page-index' : 'lineblack'}`}>2</div>
          <div className={`pageNumberLineBetween ${currentPage===2 || currentPage===3 ? 'color.between.line'  : ''}`}></div>
          <div onClick={() => handlePageClick(3)} id='3' className={`pageNumbers ${currentPage === 3  ? 'color-page-index' : 'lineblack'}`}>3</div>
          <div className={`pageNumberLineBetween ${currentPage===4 || currentPage===3 ? 'color.between.line'  : ''}`}></div>
          <div onClick={() => handlePageClick(4)} id='4' className={`pageNumbers ${currentPage === 4 ? 'color-page-index' : 'lineblack'}`}>4</div> 
        </div>
        <div className='pageDescriptionDiv'>
          <p className='desc1'>Initial Information</p>
          <p className={`desc2 ${currentPage===2 ? 'color-desc' : ''}`}>Party Information</p>
          <p className={`desc3 ${currentPage===3 ? 'color-desc' : ''}`}>Logistics</p>
          <p className={`desc4 ${currentPage===4 ? 'color-desc' : ''}`}>Additional Information</p>
        </div>
      </>

    );
}



/**************************** PAGE 2 ************************** */

const parties=[];
function Page2(){

  const [count, setCount] = useState(0);

  function handleAddClick(c){
    setCount(c);

    
  }
  function handleDelClick(c){
    setCount(c);
  
  }

  const parties=[];

  // const componentsArray = Array.from({ length: count }, (_, index) => (
  //   <InfoTemplate key={index} dlt={true} handleAddClick={handleAddClick}/> // Add a unique key to each component
  // ));

  for(let i=0;i<count;i++)
  {
    parties.push(<InfoTemplate key={i+1} dlt={true} handleDelClick={handleDelClick}/>)
  }

  // const componentsArray = parties.map(party=> party);

  return(
    <>
      <InfoTemplate heading={"Booking Party Information"} sideheading={"(Enter as much as possible)"} subheading={"Use information on Account"}/>
      <InfoTemplate heading={"Opposing Party Information"} sideheading={""} subheading={""}/>
      { parties.map(party=> party) }
      <AddPartiesButton handleAddClick={handleAddClick} count={count} />
    </>
  )
}

function InfoTemplate({heading, subheading, sideheading, dlt, count, handleAddClick, handleDelClick}){
   return (
    <div className='template-container'>
      {dlt && <DeletePartiesButton handleDelClick={handleDelClick} count={count}/>}
      {heading && <div className='template-heading'>
        <FaChevronUp />
        <h3>{heading}</h3>
        <p>{sideheading}</p>
      </div>}
      <div className='template-subheading'>
        <p>{subheading}</p>
        {/* Icon */}
      </div>

      <div className='firm-info-input'>
        <div className='f-input'>
          {/* <InputBox title={"Firm Name"} placehldr={"Input"} /> */}
          <CustomInputBox wide={335} title={"Firm Name"} placehldr={"Input"} icon2={<FaChevronDown size={20} /> } />
          <InputBox title={"Booking Contact Name"} placehldr={"Type here"} />
          <InputBox title={"Phone Number(No Spaces)"} placehldr={"Type here"} />
        </div>
        <div className='f-input'>
          <InputBox title={"Billing Address"} placehldr={"Type here"} />
          <InputBox title={"ZIP/Postal Code"} placehldr={"Input"} />
          <InputBox title={"Country/City"} placehldr={"Canada"} />
        </div>
      
      </div>

      <div className='role-info-input'>
        <div className='r-input'>
            {/* <InputBox title={"Role"} placehldr={"Input"} /> */}
            <CustomInputBox wide={335} margin={-100} title={"Role"} placehldr={"Input"} icon2={<FaChevronDown size={20} /> } />
            <InputBox title={"Name of Repreesented Client"} placehldr={"Input"} />
          </div>
          <div className='r-input2'>
            <InputBox title={"Lead counsel(s) information"} placehldr={"Name"} />
            <span className='dots3'><FaEllipsisH /></span>
            <InputBox title={""} placehldr={"Email"} />
          </div>
          <div className='extrabox'>
            <FaPlus className='plus'/>
            
              <span className='extrbox-span'><InputBox title={""} placehldr={"Add additional counsel"} shadow={true}/></span>
              <span className='extrbox-dots3'><FaEllipsisH /></span>
              <InputBox title={''} placehldr={""}  shadow={true}/>
            
            
          </div>
        
      </div>
      
    </div>
   )
}



function AddPartiesButton({handleAddClick, count}){
  console.log("Add" + count);
  return <button  onClick={() => handleAddClick(count+1)} className='add-party'>+  ADDITIONAL PARTIES</button>
}

function DeletePartiesButton({handleDelClick, count}){
  console.log("Del" + count);
  return <button  onClick={() => handleDelClick(count-1)} className='delete-party'> X  ADDITIONAL PARTIES</button>
}
/**************************** PAGE 2 ENDS ************************** */





/********************************** PAGE 3  ***************************** */
function Page3(){

  return (
    <>
      <BasicLogistics heading={"Basic Logistics"} sideheading={""} subheading={"Upload Cover Page(Optional)"} />
      <VirtualLogictics heading={"Virtual Logistics"} />
    </>
  )
  
}

function BasicLogistics({heading, subheading}){

  const [tribeToggle, setTribeToggle] = useState(false);
  function handleToggle(){
    setTribeToggle(!tribeToggle);
  }

  return (
    <div className='basic-logistics-container'>
      <div className='template-heading'>
        <FaChevronUp />
        <h3>{heading}</h3>
        {/* <p>{sideheading}</p> */}
      </div>
      <div className='basic-logistics-subheading'>
        <p>{subheading}</p>
        {/* Icon */}
      </div>
      <div className='basic-logistics-subheading'>
        <p>Choose File here<span><HiMiniArrowUpTray /></span></p>
        {/* Icon */}
      </div>


      <div className='style-of-cause'>
        <InputBox title={"Style of Cause"} placehldr={"Type here"} />
        <InputBox title={"Court File #"} placehldr={"Type here"} />
        <CustomInputBox title={"Booking Dates"} placehldr={"-----"} icon1={<CiCalendar size={40} />} icon2={<FaChevronDown size={20}/>}/>

      </div>

      <div className='time-line'>
        <div className='time-element1'>
          <span className='question-icon'><FaQuestionCircle size={25}  /></span>
          <CustomInputBox wide={200} title={"Start time"} icon2={<FaChevronDown size={20} /> }  />
        </div>
        
        <div className='time-element2'>
          <span className='question-icon'><FaQuestionCircle size={25} /></span>
          <CustomInputBox wide={200} title={"End time"} icon2={<FaChevronDown size={20} /> }  />
        </div>
      
        <div className='time-element3'><CustomInputBox wide={200} title={"Time Zone"}    /></div>
      </div>

      <div className='arbitrator-container' >
        <div className='arbitrator-line'>
        <InputBox title={"Arbitrator(s)"} placehldr={"Chair's name"} />
          <span className='arbitrator-dots3'><FaEllipsisH /></span>
          <span className='arbitrator-span'><InputBox title={""} placehldr={"Email"} /></span>
        </div>

        <div className='arbitrator-extrabox'>
          <FaPlus className='plus'/>            
          <span className='extrbox-span'><InputBox title={""} placehldr={"Add additional arbitrator"} shadow={true}/></span>
          <span className='extrbox-dots3'><FaEllipsisH /></span>
          <InputBox title={''} placehldr={""}  shadow={true}/>  
        </div>
      </div>

      <div className='tribunal-secretary'>
        <p>Tribunal Secretary ?</p>

        <button className='toggle-btn'  onClick={()=> handleToggle()}>{tribeToggle ? <FaToggleOn size={35}/> : <FaToggleOff size={35} />}</button>
        
        {/* <FaToggleOff /> */}
      </div>
      {tribeToggle && <div className='tribunal-line'>
          <InputBox  placehldr={"Tribunal secretary's name"} shadow={true}/>
          <span className='arbitrator-dots3'><FaEllipsisH /></span>
          <span className='arbitrator-span'><InputBox title={""} placehldr={"Email"} shadow={true}/></span>
      </div>}

      <div className='arbitrator-container' >
        <div className='arbitrator-line'>
          <InputBox title={"Witness(es)"} placehldr={"Name"} />
          <span className='arbitrator-dots3'><FaEllipsisH /></span>
          <span className='arbitrator-span'><InputBox title={""} placehldr={"Email"} /></span>
        </div>

        <div className='arbitrator-extrabox'>
          <FaPlus className='plus'/>            
          <span className='extrbox-span'><InputBox title={""} placehldr={"Add additional arbitrator"} shadow={true}/></span>
          <span className='extrbox-dots3'><FaEllipsisH /></span>
          <InputBox title={''} placehldr={""}  shadow={true}/>  
        </div>
      </div>





    </div>
  )
}


function VirtualLogictics({heading}){

  const [need, setNeed] =useState(false);
  function handleToggle(){
    setNeed(!need);
  }

  const [record, setRecord] =useState(false);
  function handleLastToggle(){
    setRecord(!record);
  }

  const [vcm, setVCM] =useState(false);
  function handleVCMToggle(){
    setVCM(!vcm);
  }
  return (
    <div className='virtual-logistics-container'>
      <div className='template-heading'>
        <FaChevronUp />
        <h3>{heading}</h3>
        {/* <p>{sideheading}</p> */}
      </div>

      <div className='vcm-toggle-question' >
        {/* <span className='vcm-ques-icon'><FaQuestionCircle size={25}/></span> */}
        <FaQuestionCircle size={25}/>
        <p>Do you require a VCM (virtual case manager)? </p>
        <button className='toggle-btn'  onClick={()=> handleVCMToggle()}>{vcm ? <FaToggleOn size={40}/> : <FaToggleOff size={40} />}</button>
        {/* <span className='vcm-tog-icon'><FaToggleOn size={40} /></span> */}
      </div>

      <div className='vcm-question'>
        {/* <p>Is there a particular VCM you want to work with?</p> */}
        <span className='vcm-ques-icon'><FaQuestionCircle size={25} /></span>
        <InputBox title={"Is there a particular VCM you want to work with?"} />
      </div>

      <div className='vcm-question'>
        {/* <p>Is there a particular VCM you want to work with?</p> */}
        <span className='vcm-ques-icon'><FaQuestionCircle size={25} /></span>
        <CustomInputBox title={"Is there a particular VCM you want to work with?"} wide={400} />
      </div>

      <div className='vcm-question'>
        {/* <p>Is there a particular VCM you want to work with?</p> */}
        <span className='vcm-ques-icon'><FaQuestionCircle size={25} /></span>
        <CustomInputBox title={"Select a virtual platform"} placehldr={"Zoom"} wide={400} icon2={<FaChevronDown size={25} />}   />
        <span className='space'></span>
        <CustomInputBox title={"Number of virtual breakout rooms"} wide={400} icon2={<FaChevronDown size={25} />}   />
      </div>

      <div className='vcm-toggle-question' >
        {/* <span className='vcm-ques-icon'><FaQuestionCircle size={25}/></span> */}
        <FaQuestionCircle size={25}/>
        <p>Do you need us to provide <br></br> Document Managing Services? </p>
        <button className='toggle-btn'  onClick={()=> handleToggle()}>{need ? <FaToggleOn size={40}/> : <FaToggleOff size={40} />}</button>
        {/* <span className='vcm-tog-icon'><FaToggleOn size={40} /></span> */}
      </div>


      <div className='last-line'>
      <div className='last-ques'>
        {/* <p>Is there a particular VCM you want to work with?</p> */}
        {/* <span className='vcm-ques-icon'><FaQuestionCircle size={25} /></span> */}
        <p>Do you have any special accommodations for your<br></br>booking that our I.T. team can look into prior to the<br></br>start date?</p>
        <InputBox   />
      </div>

      {need && <div className='last-line-toggle'>
        <p>Would you like your matter to be recorded?</p>
        <button className='toggle-btn'  onClick={()=> handleLastToggle()}>{record ? <FaToggleOn size={40}/> : <FaToggleOff size={40} />}</button>

      </div>}
      </div>

      

    </div>
  )
}



/************************************PAGE 3 ENDS ********************************* */




/*************************************   PAGE 4 ************************************** */

function Page4(){

  return(
    <>
      <CourtReporting heading={"Court Reporting"} />
      <AdditionalFeatures heading={"Additional Features"} />
    </>
  )
}

function CourtReporting({heading}){

  const [manage, setManage] =useState(false);
  function handleManageToggle(){
    setManage(!manage);
  }

  const [report, setReport] =useState(false);
  function handleReportToggle(){
    setReport(!report);
  }


  const [transcript, setTranscript] =useState(false);
  function handleTranscriptToggle(){
    setTranscript(!transcript);
  }


  const [multilingual, setMultilingual] =useState(false);
  function handleMultilingualToggle(){
    setMultilingual(!multilingual);
  }

  return(

    <div className='court-reporting-container'>
      <div className='template-heading'>
        <FaChevronUp />
        <h3>{heading}</h3>
        {/* <p>{sideheading}</p> */}
      </div>

      <div className='court-reporting-toggle-question' >
        {/* <span className='vcm-ques-icon'><FaQuestionCircle size={25}/></span> */}
        {/* <FaQuestionCircle size={25}/> */}
        <p>Do you need us to provide <br></br> Document Managing Services? </p>
        <button className='toggle-btn'  onClick={()=> handleManageToggle()}>{manage ? <FaToggleOn size={40}/> : <FaToggleOff size={40} />}</button>
        {/* <span className='vcm-tog-icon'><FaToggleOn size={40} /></span> */}
      </div>




      { manage && (
            <>
              <div className='court-reporting-toggle-question' >         
                <p>Would you like an Arbitration Place<br></br>Court Reporter?</p>
                <button className='toggle-btn'  onClick={()=> handleReportToggle()}>{report ? <FaToggleOn size={40}/> : <FaToggleOff size={40} />}</button>         
              </div>

              {report && 
                <>
                  <div className='court-report-select-input'>
                  <p>Is there a specific Arbitration Place Court Reporter<br></br>you prefer?</p>
                  <div className='court-report-select-input-line' ><span className='q-icon'><FaQuestionCircle size={30}/></span><CustomInputBox wide={350} placehldr={"Select AP Court Reporter"} icon2={<FaChevronDown size={25} />} /></div>
                  </div>




                  <div className='court-reporting-toggle-question' >
                  <p>Will a transcript be required?</p>
                  <button className='toggle-btn'  onClick={()=> handleTranscriptToggle()}>{transcript ? <FaToggleOn size={40}/> : <FaToggleOff size={40} />}</button>
                  </div>
                  
                  

                  {transcript && 
                    <>
                      <div className='court-report-select-input'>
                      <p>Turnaround time?</p>
                      <div className='court-report-select-input-line' ><span className='q-icon'><FaQuestionCircle size={30}/></span><CustomInputBox wide={350}  placehldr={"Standard"} icon2={<FaChevronDown size={25} />} /></div>
                      </div>


                      <div className='court-reporting-toggle-question' >
                      <p>Multilingual?</p>
                      <button className='toggle-btn'  onClick={()=> handleMultilingualToggle()}>{multilingual ? <FaToggleOn size={40}/> : <FaToggleOff size={40} />}</button>
                      </div>

                      

                      {multilingual && 
                        <>
                          <div className='court-report-select-input'>
                          <p>Please list the non-english languages you would<br></br>like accommodated (separate by comma)</p>
                          <div className='court-report-select-input-line-noques' ><CustomInputBox wide={350} placehldr={"Input"} icon2={<FaChevronDown size={25} />} /></div>
                          </div>

                          <div className='court-report-select-input'>
                          <p>Daily Rough Draft?</p>
                          <div className='court-report-select-input-line' ><span className='q-icon'><FaQuestionCircle size={30}/></span><CustomInputBox wide={350} placehldr={"Select AP Court Reporter"} icon2={<FaChevronDown size={25} />} /></div>
                          </div>

                          <div className='court-report-select-input'>
                          <p>Realtime Reporting?</p>
                          <div className='court-report-select-input-line' ><span className='q-icon'><FaQuestionCircle size={30}/></span><CustomInputBox wide={350} placehldr={"Select AP Court Reporter"} icon2={<FaChevronDown size={25} />} /></div>
                          </div>
                        </>
                      }
                    </>
                    
                  }
                </>
              }

            </>
          
          
          
          
          
          
          )






          
      }

    </div>
  )
}


function AdditionalFeatures({heading}){

  const [interpret, setInterpret] =useState(false);
  function handleInterpretToggle(){
    setInterpret(!interpret);
  }

  const [cart, setCart] =useState(false);
  function handleCartToggle(){
    setCart(!cart);
  }

  const [quote, setQuote] =useState(false);
  function handleQuoteToggle(){
    setQuote(!quote);
  }

  return(

    <div className='additional-features-container'>
      <div className='template-heading'>
        <FaChevronUp />
        <h3>{heading}</h3>
        {/* <p>{sideheading}</p> */}
      </div>

      <div className='additional-feature-toggle-question' >
        {/* <span className='vcm-ques-icon'><FaQuestionCircle size={25}/></span> */}
        {/* <FaQuestionCircle size={25}/> */}
        <p>Do you need reuire interpretation?</p>
        <button className='toggle-btn'  onClick={()=> handleInterpretToggle()}>{interpret ? <FaToggleOn size={40}/> : <FaToggleOff size={40} />}</button>
        {/* <span className='vcm-tog-icon'><FaToggleOn size={40} /></span> */}
      </div>

      {interpret && 
        <>
          <div className='court-report-select-input'>
          <p>Please list all languages to be interpreted<br></br>(separate by comma)</p>
          <div className='court-report-select-input-line' ><span className='q-icon'><FaQuestionCircle size={30}/></span><CustomInputBox wide={350} placehldr={"Input"}  /></div>
          </div>
        </>
      }
      

      <div className='additional-feature-toggle-question' >
        {/* <span className='vcm-ques-icon'><FaQuestionCircle size={25}/></span> */}
        {/* <FaQuestionCircle size={25}/> */}
        <p>Do you need reuire CART services?</p>
        <button className='toggle-btn'  onClick={()=> handleCartToggle()}>{cart ? <FaToggleOn size={40}/> : <FaToggleOff size={40} />}</button>
        {/* <span className='vcm-tog-icon'><FaToggleOn size={40} /></span> */}
      </div>

      <div className='additional-feature-toggle-question' >
        {/* <span className='vcm-ques-icon'><FaQuestionCircle size={25}/></span> */}
        {/* <FaQuestionCircle size={25}/> */}
        <p className='add-features-last-toggle'>Will you need a quote prior to<br></br>confirmation?</p>
        <button className='toggle-btn'  onClick={()=> handleQuoteToggle()}>{quote ? <FaToggleOn size={40}/> : <FaToggleOff size={40} />}</button>
        {/* <span className='vcm-tog-icon'><FaToggleOn size={40} /></span> */}
      </div>


      <div className='last-request'>
        <CustomInputBox title={"Please list any additional requests or considerations you might have at this time"} placehldr={"Input"} wide={600}/>
      </div>

    </div>
  )
}



/*************************************   PAGE 4 ENDS  ************************************** */


function InputBox({title, placehldr, shadow}){
  return(
    <div className='inputbox'>
      {title ? <p>{title}</p> : <p  style={{ opacity: 0.0 }}>no space</p>}
      {/* {title ? <p dangerouslySetInnerHTML={{ __html: title }} /> : <p  style={{ opacity: 0.0 }}>no space</p>} */}
      {/* <input type='input' placeholder={placehldr} /> */}

      <form>
        <input type='text' placeholder={placehldr} style={shadow && {borderColor : 'gray'}} />
      </form>
    </div>
  )
}

// , icon1, icon2

function CustomInputBox({title, placehldr, icon1, icon2, wide, margin}){

  return(
    <div className='custom-input-box-container'>
      {title ? <p>{title}</p> : <p  style={{ opacity: 0.0, }}>no space</p>}
      {/* <input type='input' placeholder={placehldr} /> */}

      <div className='custom-input-box' style={{width : wide, marginRight:margin}}>
        {icon1}
        {/* <CiCalendar /> */}
        <input type='text' placeholder={placehldr} />
        {icon2}
        {/* <FaChevronDown /> */}
        
      </div>
    </div>
  )

}



export default App;
