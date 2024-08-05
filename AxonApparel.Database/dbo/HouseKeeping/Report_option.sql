CREATE TABLE [dbo].[Report_option]
(
	[optionid] [int] IDENTITY(1,1) NOT NULL Primary key,
	[option_name] [varchar](50) NULL,
	[option_value] [bit] NULL,
	[setupid] [int] NULL,

	CONSTRAINT [FK_report_setupid] FOREIGN KEY([setupid]) REFERENCES [dbo].[Report_Footer_Setup] ([Rpt_Setupid])
)
