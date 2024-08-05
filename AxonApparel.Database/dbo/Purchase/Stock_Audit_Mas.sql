CREATE TABLE [dbo].[Stock_Audit_Mas]
(
	[Audit_MasId] INT IDENTITY(1,1) NOT NULL, 
	[Entry_No] [varchar](20) NULL,
	[Entry_Date] [datetime] NULL,
	[Companyid] [int] NULL,
	[Supplierid] [int] NULL,
	[buyerid] [int] NULL,
	[item_Groupid] [int] NULL,
	[Buy_Ord_no] [varchar](20) NULL,
	[Styleid] [int] NULL,
	[Job_Ord_no] [varchar](20) NULL,
	[Remarks] [varchar](1000) NULL,
	[General] [bit] NULL,
	[CreatedBy] [int] NULL,
    CONSTRAINT [PK_Stock_Audit_Mas] PRIMARY KEY ([Audit_MasId]), 
    CONSTRAINT [FK_Stock_Audit_Mas_Employee] FOREIGN KEY ([CreatedBy]) REFERENCES [Employee]([EmployeeId]), 
	  CONSTRAINT [FK_Stock_Audit_Mas_buyer] FOREIGN KEY ([buyerid]) REFERENCES [Buyer]([BuyerId]),
	  CONSTRAINT [FK_Stock_Audit_Mas_Supplier] FOREIGN KEY ([Supplierid]) REFERENCES [Supplier]([SupplierId]),
	    CONSTRAINT [FK_Stock_Audit_Mas_StyleHeader] FOREIGN KEY ([Styleid]) REFERENCES [StyleHeader]([StyleId]),
    CONSTRAINT [CK_Stock_Audit_Mas_Entry_No] CHECK (([Entry_No] <> ''))
)
