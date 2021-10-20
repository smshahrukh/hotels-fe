import React, { useEffect, useState } from "react";
import { useStore } from '../store/Store';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { SET_HOTELS, SET_DATA_POINTS } from "../reducers";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const FiltersComponent = () => {
    const [state, dispatch] = useStore();
    const [selectedHotel, setSelectHotel] = useState("")
    const [selectedStartDate, setStartDate] = useState("")
    const [selectedEndDate, setEndDate] = useState("")

    useEffect(() => {
        const fetchHotels = async () => {
            const hotelRes = await fetch(`${BASE_URL}/hotels`);
            const hotelList = await hotelRes.json()

            dispatch({
                type: SET_HOTELS,
                hotels: hotelList.hotels
            })
        }

        fetchHotels();
    }, [])

    const handleSubmit = async (event) => {

        event.preventDefault();
        event.stopPropagation();

        try {
            const datapointsRes = await fetch(`${BASE_URL}/dashboard/${selectedHotel}?startDate=${selectedStartDate}&endDate=${selectedEndDate}`);
            if (datapointsRes.status === 200) {
                const datapointsData = await datapointsRes.json()
    
                dispatch({
                    type: SET_DATA_POINTS,
                    datapoints: datapointsData.data.datapoints,
                    groupedDate: datapointsData.data.groupedDate
                })
            }
        }
        catch (e) {
            console.error("Something went wrong")
        }


    }

    const { hotels } = state

    return (
        <div>
            <Container>
                <Form noValidate onSubmit={handleSubmit}>
                    <div className="filterWrapper">
                        <div className="filterCell">
                            <FloatingLabel controlId="hotelsSelect" label="Select a Hotel">
                                <Form.Select aria-label="Select a Hotel" controlId="hotelsSelect"
                                    onChange={e => setSelectHotel(e.target.value)}
                                    value={selectedHotel}
                                >
                                    <option></option>
                                    {hotels.map(hotel => {
                                        return (<option value={hotel.id}>{hotel.name} </option>)
                                    })}
                                </Form.Select>
                            </FloatingLabel>
                        </div>
                        <div className="filterCell">
                            <FloatingLabel controlId="startDateSelect" label="Start Date">
                                <Form.Control
                                    required
                                    onChange={e => setStartDate(e.target.value)}
                                    value={selectedStartDate}
                                    type="date"
                                    placeholder="Starting Date"
                                />
                            </FloatingLabel>
                        </div>
                        <div className="filterCell">
                            <FloatingLabel controlId="endDateSelect" label="End Date">
                                <Form.Control
                                    required
                                    onChange={e => setEndDate(e.target.value)}
                                    value={selectedEndDate}
                                    type="date"
                                    placeholder="End Date"
                                />
                            </FloatingLabel>
                        </div>
                    </div>
                    <Row>
                        <div className="submitBtn">
                            <Button type="submit">Filter</Button>
                        </div>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default FiltersComponent;