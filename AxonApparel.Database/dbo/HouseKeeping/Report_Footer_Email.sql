CREATE TABLE [dbo].[Report_Footer_Email]
(
	[Rpt_Setupid] [int] NOT NULL,
	[Rpt_EmpId] [int] IDENTITY(1,1) NOT NULL Primary key,
	[Employeeid] [int] NOT NULL,

	CONSTRAINT [FK_Rep_Footer_Email_Processid] FOREIGN KEY([Employeeid]) REFERENCES [dbo].[employee] ([employeeid]),
	CONSTRAINT [FK_Rep_Footer_Email_Setupid] FOREIGN KEY([Rpt_Setupid]) REFERENCES [dbo].[Report_Footer_Setup] ([Rpt_Setupid])
)
