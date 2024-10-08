﻿CREATE TABLE [dbo].[DespatchMas]
(
	[DespatchId] INT IDENTITY(1,1) NOT NULL,
	[DespatchNo] [varchar](20) NOT NULL,
	[DespatchDate] [datetime] NOT NULL,
	[CompanyId] [int] NULL,
	[Order_No] [varchar](20) NOT NULL,
	[StyleId] [int] NOT NULL,
	[Buy_Ord_Ship] [varchar](8) NOT NULL,
	[ShipmentMode] [int] NOT NULL,
	[SystemId] [int] NOT NULL,
	[ShipmentType] [varchar](1) NOT NULL Default('P'),
	[DocRefNo] [varchar](25) NOT NULL Default(''),
	[DocRefDate] [datetime] NOT NULL,
	[InvRefNo] [varchar](25) NOT NULL Default(''),
	[InvRefDate] [datetime] NOT NULL,
	[IssueStoreid] [int] NULL,
	[OrderType] [char](1) NULL,
	[PreCarriageby] [varchar](100) NULL,
	[PlaceofReceipt] [varchar](100) NULL,
	[VesselFlightNo] [varchar](100) NULL,
	[PortOfDischargeID] [int] NULL,
	[VesselFlight] [varchar](100) NULL,
	[MarksNos] [varchar](200) NULL,
	[Cartons] [int] NULL,
	[CreatedBy] [int] NULL,
	[CBMQty] [numeric](15, 2) NULL,
	[SupplierID] [int] NULL,
	CONSTRAINT [PK_DespatchMasRefid] PRIMARY KEY ([DespatchId]),
	CONSTRAINT [FK_DesCompRefId] FOREIGN KEY ([CompanyId]) REFERENCES [Company]([Companyid]),
	CONSTRAINT [FK_DesPortofloadingRefId] FOREIGN KEY ([PortOfDischargeID]) REFERENCES [PortOfLoading]([PortOfLoadingid]),
	CONSTRAINT [FK_DesModeofShipRefId] FOREIGN KEY ([ShipmentMode]) REFERENCES [Mode_Of_Shipment]([Mode_of_Shipmentid]),
	CONSTRAINT [FK_DesStyleRefId] FOREIGN KEY ([StyleId]) REFERENCES styleheader(StyleId),
	CONSTRAINT [FK_DesSystemRefId] FOREIGN KEY ([SystemId]) REFERENCES ShipmentSystem(SystemId),
	CONSTRAINT [FK_DesEmployeeRefId] FOREIGN KEY ([CreatedBy]) REFERENCES Employee(EmployeeId),
	CONSTRAINT [FK_DesIssStoreRefId] FOREIGN KEY ([IssueStoreid]) REFERENCES [StoreUnit]([StoreUnitID]),
	CONSTRAINT [FK_DesSupplierRefId] FOREIGN KEY ([SupplierID]) REFERENCES [supplier]([supplierid]),
	CONSTRAINT [Chk_DesShippType] CHECK  (([ShipmentType] = 'P' or [ShipmentType] = 'F')),
	CONSTRAINT [Chk_DespatchNoType] CHECK  (([DespatchNo] <>''))
)
