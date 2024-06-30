import React, { useEffect, useRef, useState } from 'react'
// import MapComponent from '../components/Maping';
// import MapComponentD from '../components/drivermap';
import Bmaping from '../components/bmap';
import Colmap from '../components/collectormap';
import Usrmap from '../components/usermap';
import { distance } from '@turf/turf';
// import Locationtracker from '../components/locationtracker';
// import ISSMap from '../components/locationtracker';

const Showmap = (props) => {
    const [userdiatance, setuseruserdistance] = useState(null)

    const dirmap = () => {

        console.log("in the showmap", props.ut1)
        if (props.ut1 === "collector") {
            return (<Colmap />)
        }
        else {
            return (<Usrmap ud={setuseruserdistance} />)
        }
    }
    const ref = useRef(null);

    useEffect(() => {
        if ((userdiatance <= 0.002790285089127844) && (props.ut1 === "user")) {
            ref.current.click();
        }
    }, [userdiatance,props.ut1])

    return (
        <>

            
            <button type="button" class="btn btn-primary " ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display: 'none'}}>
                Launch demo modal
            </button>

            
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id='outer'>
                {/* <MapComponent center={[37.775, -122.418]} zoom={15} /> */}
                {/* <Bmaping center={[37.775, -122.418]} zoom={15} /> */}
                {/* <MapComponentD  center={[37.775, -122.418]} zoom={15} /> */}
                {/* <Locationtracker /> */}
                {/* <ISSMap /> */}
                {/* <Colmap /> */}
                {dirmap()}
                <div id='funt' >
                    <div id="daytypr1">
                        <p>FRIDAY</p>
                        <p>DRY WASTE</p>
                    </div>
                    <div id="daytypr2">
                        <p>distance</p>
                        <p>{props.ut1 === 'collector'? "":userdiatance}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Showmap;