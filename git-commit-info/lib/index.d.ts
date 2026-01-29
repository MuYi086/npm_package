export interface GitCommitInfo {
  /** 远程项目名称 */
  projectName: string;
  /** 当前分支 */
  branch: string;
  /** Git 用户名 */
  gitUserName: string;
  /** Git 用户邮箱 */
  gitUserEmail: string;
  /** 提交者名称 */
  commitName: string;
  /** 提交者邮箱 */
  commitEmail: string;
  /** 提交日期 */
  commitDate: string;
  /** 最新标签 */
  latestTag: string;
  /** 提交哈希 */
  commitHash: string;
  /** 提交主题（非 prod 环境） */
  commitSubject?: string;
  /** 两个 tag 之间的提交主题数组（prod 环境） */
  commitSubjects?: string[];
  /** 上一个 tag（prod 环境） */
  previousTag?: string;
}

/**
 * 获取 Git 提交信息
 * @param env 环境参数，'prod' 时返回两个 tag 之间的所有 commits
 */
export function gitCommitInfo(env?: string): GitCommitInfo;