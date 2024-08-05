CREATE TABLE [dbo].[Pur_Debit_Mas]
(
	[Debit_id] [int] IDENTITY(1,1) NOT NULL,
	[Debit_no] [varchar](20) NOT NULL,
	[Debit_date] [datetime] NOT NULL,
	[companyid] [int] NULL,
	[company_unitid] [int] NULL,
	[supplierid] [int] NULL,
	[remarks] [varchar](2000) NULL,
	[debitcommit] [varchar](1) NULL,
	[DocuID] [int] NULL,
	[DocType] [varchar](3) NULL,
	[Amount] [numeric](12, 3) NULL,
	[DocumentNo] [varchar](20) NULL,
	[DocPrefix] [varchar](15) NULL,
	[EntryType] [varchar](2) NULL,
	[voucherid] [int] NULL,
	[ledgerid] [int] NULL,
	[CreatedBy] [int] NULL, 
    CONSTRAINT [FK_Pur_Debit_Mas_Ledger] FOREIGN KEY ([ledgerid]) REFERENCES [Ledger]([LedgerId]),
	CONSTRAINT [FK_Pur_Debit_Mas_Voucher] FOREIGN KEY ([voucherid]) REFERENCES [Voucher]([VoucherId]), 
    CONSTRAINT [PK_Pur_Debit_Mas] PRIMARY KEY ([Debit_Id])
)
