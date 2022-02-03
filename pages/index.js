import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import {exchanges} from '../utils/fee'
import {Spacer, Grid, Display, Card, Select, Text, Radio, Input } from '@geist-ui/core';
import { calculateExchangeFee, calculateTDS, totalTax } from '../utils/cal'


export default function Home() {
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [exchangeFee, setExchangeFee] = useState(null)
  const [transaction, setTransaction] = useState(null)
  const [amount, setAmount] = useState(null)
  const [tds, setTds] = useState(null);
  const [fee, setFee] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null)

  const selectExchangeHandler = (value) => {
    setSelectedExchange(exchanges[parseInt(value)])
    
  }

  const selectTransHandler = (value) =>{
    setTransaction(value)
  }

  const calculateTax = () =>{
      const tdsAmount = calculateTDS(amount);
      const exchangeFee = calculateExchangeFee((parseFloat(amount) - parseFloat(tdsAmount)), selectedExchange[transaction])
      const total = totalTax(tdsAmount, exchangeFee)
      setTotalAmount(total)
      setTds(tdsAmount);
      setFee(exchangeFee)
  }

  useEffect(() => {
    function init() {
      try {
        calculateTax();
      } catch (e) {
        console.log(e)
      }
    }
    init();
  }, [amount, selectedExchange]);
  

  return (
    <>
    <Spacer h={5}/>
    <Grid.Container gap={2} justify="center" alignContent='center' alignItems='center' height="100px">
      <Spacer w={10}/>
      <Grid xs={24}>
      <Text h1 b>Taxsh.it</Text>
      </Grid>
    </Grid.Container>
    <Text p b>Calculate your Tax Deductions on crypto by choosing the exchange to invest with.</Text>
    <Spacer h={5}/>
    <Grid.Container gap={4} justify="center" height="100px">
      <Grid xs={6}>
      <Text h6>1. Select an Exchange</Text>
      <Spacer w={10}/>
      <Select placeholder="Choose an Exchange" onChange={selectExchangeHandler}>
        {
          exchanges.map((exchange, index) => {
            return(
              <Select.Option value={index.toString()}>{exchange.name}</Select.Option>
            )
          })
        }
        </Select>
      </Grid>
      <Spacer w={2}/>
      <Grid xs={6}>
        <Text h6>2. Select your trade</Text>
        <Spacer w={2}/>
        <Radio.Group onChange={selectTransHandler}>
          <Radio value="buyFee">Buy</Radio>
          <Radio value="sellFee">Sell</Radio>
        </Radio.Group>
      </Grid>
      <Grid xs={6}><Spacer w={10}/>
        {
          selectedExchange && transaction ? (<Text small>{`Trade Fee is ${selectedExchange[transaction]}`}</Text>) : (<p></p>)
        }
        </Grid>
    </Grid.Container>

    <Spacer h={3}/>
    <Grid.Container gap={4} justify="center" height="100px">
      <Grid xs={6}>
      <Text h6>3. Enter amount you wish to trade</Text>
      <Spacer w={3}/>
        <Input placeholder="Amount" onChange={(e) => setAmount(e.target.value)}/>
      </Grid>
      <Spacer w={2}/>
      <Grid xs={6}>
      <Text h6>1% TDS</Text>
        {
          tds ? <Input readOnly initialValue={tds} /> : <Input readOnly initialValue="" />
        }
      </Grid>
      <Grid xs={6}>
      <Spacer w={10}/>
      <Text h6>Exchange Fee Deduction</Text>
        {
          fee ? <Input readOnly initialValue={fee} /> : <Input readOnly initialValue="" />
        }
      </Grid>
    </Grid.Container>

    <Spacer h={3}/>
    <Grid.Container gap={4} justify="center" height="100px">
      <Grid xs={6}>
      <Text h6>Your total Deductions</Text>
        {
          totalAmount ? <Input readOnly initialValue={totalAmount} /> : <Input readOnly initialValue="" />
        }
      </Grid>
      <Grid xs={6}>
      <Text h6>Amount available for investing</Text>
        {
          totalAmount ? <Input readOnly initialValue={parseFloat(amount) - parseFloat(totalAmount)} /> : <Input readOnly initialValue="" />
        }
      </Grid>
    </Grid.Container>

  </>
  )
}
