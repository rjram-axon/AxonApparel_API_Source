CREATE TABLE [dbo].[ProcessSeq_Amend]
(
	[AmdPSeqId] [int] IDENTITY(1,1) NOT NULL primary key,
	[ProcessSeqid] [int] NOT NULL,
	[Processid] [int] NULL ,
	[AmdProc_seq_masid] [int] NULL,
	 CONSTRAINT [fk_proc_seq_masidAmd] FOREIGN KEY([AmdProc_seq_masid])REFERENCES [dbo].[ProcessSeq_Mas_Amend] ([AmdProc_seq_masid]),
	 CONSTRAINT [fk_processseqAmd_processid] FOREIGN KEY([Processid])REFERENCES [dbo].[Process] ([ProcessId])
)
