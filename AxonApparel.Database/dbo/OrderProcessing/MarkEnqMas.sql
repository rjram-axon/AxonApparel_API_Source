﻿CREATE TABLE [dbo].[MarkEnqMas]
(
    [EnquiryId] [int] IDENTITY(1,1) NOT NULL,
	[EnquiryNo] [varchar](20) NOT NULL,
	[EnqDate] [datetime] NULL,
	[CompanyId] [int] NOT NULL,
	[BuyerId] [int] NOT NULL,
	[BuyerRef] [varchar](50) NOT NULL DEFAULT (''),
	[RefDate] [datetime] NULL,
	[TermsId] [int] NOT NULL,
	[DespDate] [datetime] NULL,
	[Remarks] [varchar](1000) NOT NULL DEFAULT (''),
	[Despatched_closed] [varchar](1) NULL DEFAULT ('N'),
	[Sampling] [varchar](1) NOT NULL DEFAULT ('N'),
	[Ordered] [varchar](1) NOT NULL DEFAULT ('N'),
	[Status] [varchar](1) NOT NULL DEFAULT ('E'),
	[ShipSystemId] [int] NULL,
	[SeasonId] [int] NULL,
	[CreatedBy] [int] NULL, 
    CONSTRAINT [PK_MarkEnqMas] PRIMARY KEY ([EnquiryId]), 
    CONSTRAINT [FK_MarkEnqMas_Season] FOREIGN KEY (SeasonId) REFERENCES [Season]([SeasonId]),
	CONSTRAINT [FK_MarkEnqMas_Buyer] FOREIGN KEY (BuyerId) REFERENCES [Buyer]([BuyerId]),
	CONSTRAINT [FK_MarkEnqMas_CreatedBy] FOREIGN KEY (CreatedBy) REFERENCES [Employee](EmployeeId),
	CONSTRAINT [FK_MarkEnqMas_TermsId] FOREIGN KEY (TermsId) REFERENCES [Payment_Terms](Pay_Termid),
	CONSTRAINT [FK_MarkEnqMas_ShipSystemId] FOREIGN KEY (ShipSystemId) REFERENCES [ShipmentSystem](SystemId), 
    CONSTRAINT [FK_MarkEnqMas_Company] FOREIGN KEY (CompanyId) REFERENCES [Company]([CompanyId]),
    CONSTRAINT [Ck_MarkEnqMas_Despatched_Closed] CHECK  (([Despatched_Closed] = 'Y' or [Despatched_Closed] = 'N' or [Despatched_Closed] = '' or [Despatched_Closed] = '')),
	CONSTRAINT [Ck_MarkEnqMas_Ordered] CHECK  (([Ordered] = 'Y' or [Ordered] = 'N')),
	CONSTRAINT [Ck_MarkEnqMas_Sampling] CHECK  (([Sampling] = 'Y' or [Sampling] = 'N')),
	CONSTRAINT [Ck_MarkEnqMas_Status] CHECK  (([Status] = 'E' or [Status] = 'Q' or [Status] = 'S'))
)
