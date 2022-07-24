import React, { useEffect, useState } from "react"

import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Typography } from "@mui/material"

import { AddRow } from "../ModalForm"
import { IUser } from "../../models/IUser"

import { useGetUsersQuery, useGetAllUsersQuery } from "../../services/infiniteScrollAPI"

export const DataTable: React.FC = React.memo(() => {
	const [page, setPage] = useState(1)
	const [data, setData] = useState<IUser[] | []>([])
	const { data: users, error, isLoading: loading } = useGetUsersQuery(page)
	//const { data: allUsers } = useGetAllUsersQuery([])

	const scrollHadler = () => {
		let target = document.documentElement
		if (target.scrollHeight - (target.scrollTop + window.innerHeight) < 5) {
			//if (allUsers && data.length < allUsers.length) //Без понятия почему не работает
			setPage(page + 1)
		}
	}

	useEffect(() => {
		if (users) setData([...data, ...users])
	}, [users])

	useEffect(() => {
		document.addEventListener("scroll", scrollHadler)
		return function () {
			document.removeEventListener("scroll", scrollHadler)
		}
	}, [page])

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}))

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
		"&:last-child td, &:last-child th": {
			border: 0,
		},
	}))

	return (
		<>
			<AddRow setData={setData} />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<StyledTableCell>IBAN</StyledTableCell>
							<StyledTableCell align='right'>Full Name</StyledTableCell>
							<StyledTableCell align='right'>City</StyledTableCell>
							<StyledTableCell align='right'>Email</StyledTableCell>
							<StyledTableCell align='right'>Password</StyledTableCell>
							<StyledTableCell align='right'>Phone</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((user: IUser) => (
							<StyledTableRow key={user.id}>
								<StyledTableCell component='th' scope='row'>
									{user.iban}
								</StyledTableCell>
								<StyledTableCell align='right'>{user.fullName}</StyledTableCell>
								<StyledTableCell align='right'>{user.city}</StyledTableCell>
								<StyledTableCell align='right'>{user.email}</StyledTableCell>
								<StyledTableCell align='right'>{user.password}</StyledTableCell>
								<StyledTableCell align='right'>{user.phone}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
				{loading && (
					<Typography
						variant='h4'
						mt={4}
						style={{
							position: "absolute",
							left: "50%",
							transform: "translateX(-50%)",
						}}
					>
						Идет загрузка...
					</Typography>
				)}
				{error && (
					<Typography
						variant='h4'
						mt={4}
						style={{
							position: "absolute",
							left: "50%",
							transform: "translateX(-50%)",
						}}
					>
						Произошла ошибка при загрузке!
					</Typography>
				)}
			</TableContainer>
		</>
	)
})
