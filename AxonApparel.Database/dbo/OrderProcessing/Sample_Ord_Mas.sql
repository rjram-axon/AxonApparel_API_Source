﻿CREATE TABLE [dbo].[Sample_Ord_Mas]
(

[Order_No] [varchar](20) NOT NULL primary key unique,
	[Order_Date] [datetime] NULL,
	[buyerid] [int] NULL,
	[Buyer_Addid] [int] NULL,
	[Managerid] [int] NULL,
	[Merchandiserid] [int] NULL,
	[Ref_no] [varchar](40) NULL,
	[Ref_date] [datetime] NULL,
	[Pay_Systemid] [int] NULL,
	[Systemid] [int] NULL,
	[Payment_Modeid] [int] NULL,
	[agentid] [int] NULL,
	[agent_addid] [int] NULL,
	[Shipagentid] [int] NULL,
	[Shipagent_addid] [int] NULL,
	[Currencyid] [int] NULL,
	[Exchange] [numeric](15, 5) NULL,
	[percentage] [numeric](10, 2) NULL,
	[CommittedDate] [datetime] NULL,
	[cancel] [bit] NOT NULL,
	[comit] [bit] NOT NULL,
	[proformaremarks] [varchar](500) NULL,
	[companyid] [int] NULL,
	[closed] [char](1) NULL,
	[closedate] [datetime] NULL,
	[quantity] [int] NULL,
	[docname] [varchar](100) NULL,
	[docpath] [varchar](100) NULL,
	[Unit] [varchar](1) NULL,
	[GUOMid] [int] NULL,
	[GUOM_Conv] [smallint] NULL,
	[Agency_Per] [numeric](5, 2) NULL,
	[Bas_Unit] [int] NULL,
	[ClaimType] [varchar](1) NOT NULL DEFAULT ('R'),
	[NominatedForwarder] [varchar](1) NOT NULL DEFAULT ('N'),
	[CSP] [varchar](1) NOT NULL DEFAULT ('N'),
	[ConsigneeID] [int] NULL,
	[Consignee_AddID] [int] NULL,
	[Buyer_Ref_No] [varchar](25) NOT NULL  DEFAULT (''),
	[CreatedBy] [int] NULL,
	[FIN_ORDERNO] [varchar](20) NULL,
	[FINYEAR] [varchar](10) NULL,
	
	CONSTRAINT [fk_sample_ord_mas_Buyer_agentid] FOREIGN KEY([agentid])REFERENCES [dbo].[Agent] ([AgentId]),
	CONSTRAINT [fk_sample_ord_mas_Buyer_ConsigneeID] FOREIGN KEY([ConsigneeID])REFERENCES [dbo].[Consignee] ([ConsigneeId]),
	 CONSTRAINT [fk_sample_ord_mas_Buyer_Currencyid] FOREIGN KEY([Currencyid])REFERENCES [dbo].[currency] ([CurrencyId]),
	 CONSTRAINT [fk_sample_ord_mas_Buyer_Managerid] FOREIGN KEY([Managerid])REFERENCES [dbo].[Employee] ([EmployeeId]),
	 CONSTRAINT [fk_sample_ord_mas_Buyer_Merchandiserid] FOREIGN KEY([Merchandiserid])REFERENCES [dbo].[Employee] ([EmployeeId]),
	 CONSTRAINT [fk_sample_ord_mas_Buyer_Pay_Systemid] FOREIGN KEY([Pay_Systemid])REFERENCES [dbo].[Payment_Terms] ([Pay_Termid]),
	 CONSTRAINT [fk_sample_ord_mas_Buyer_Ship_agentid] FOREIGN KEY([Shipagentid])REFERENCES [dbo].[Agent] ([AgentId]),
	 CONSTRAINT [fk_sample_ord_mas_buyerid] FOREIGN KEY([buyerid])REFERENCES [dbo].[Buyer] ([BuyerId]),
	 CONSTRAINT [fk_sample_ord_mas_Companyid] FOREIGN KEY([companyid])REFERENCES [dbo].[Company] ([CompanyId]),
	 CONSTRAINT [FK_sample_ord_mas_CreatedBy] FOREIGN KEY([CreatedBy])REFERENCES [dbo].[Employee] ([EmployeeId]),
	 )
