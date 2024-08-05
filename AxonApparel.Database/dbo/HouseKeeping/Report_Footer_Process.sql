CREATE TABLE [dbo].[Report_Footer_Process]
(
	[Rpt_Setupid] [int] NULL,
	[Rpt_Processid] [int] IDENTITY(1,1) NOT NULL Primary key,
	[Rpt_Ins] [varchar](1500) NULL,
	[Processid] [int] NULL,

	CONSTRAINT [FK_Rep_Footer_Processid] FOREIGN KEY([Processid]) REFERENCES [dbo].[process] ([processid]),
	CONSTRAINT [FK_Rep_Footer_Rpt_Setupid] FOREIGN KEY([Rpt_Setupid]) REFERENCES [dbo].[Report_Footer_Setup] ([Rpt_Setupid])
)
