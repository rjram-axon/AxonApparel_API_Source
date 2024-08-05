CREATE TABLE [dbo].[Sample_Ord_PlanMas]
(
	[SPlanId] [int] IDENTITY(1,1) NOT NULL, 
	[PlanDate] [datetime] NULL,
	[Order_No] [varchar](20) NULL,
	[Sample_Job_No] [varchar](20) NULL,
	[Companyid] [int] NULL,
	[Company_Unitid] [int] NULL,
	[Remarks] [varchar](1000) NULL,
	[App_By] [int] NULL,
	[App_Date] [datetime] NULL,
	[App_Remarks] [varchar](1000) NULL,
    CONSTRAINT [PK_Sample_Ord_PlanMas] PRIMARY KEY ([SPlanId]), 
    CONSTRAINT [FK_Sample_Ord_PlanMas_Companyid] FOREIGN KEY ([Companyid]) REFERENCES [company]([companyId]),
	CONSTRAINT [FK_Sample_Ord_PlanMas_Companyunitid] FOREIGN KEY ([Company_Unitid]) REFERENCES [CompanyUnit]([Id])
    
)
