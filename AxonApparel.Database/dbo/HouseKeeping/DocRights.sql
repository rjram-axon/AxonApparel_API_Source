CREATE TABLE [dbo].[DocRights]
(
	DocRightsid int not null identity(1,1) primary key,
	[Rpt_Id] [int] NULL,
	[CheckOption] [varchar](50) NOT NULL,
	[optionValue] [bit] NULL,

	CONSTRAINT [FK_Docr_report_setupid] FOREIGN KEY([Rpt_Id]) REFERENCES [dbo].[ReportPrefix] ([Rpt_PID])
)
